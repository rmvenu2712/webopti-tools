import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
  export const runtime = 'edge';
export async function POST(req: NextRequest) {
  try {
    const { domain } = await req.json();
    if (!domain) return NextResponse.json({ error: 'Domain required' }, { status: 400 });

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) return NextResponse.json({ error: 'API key missing' }, { status: 500 });

    // -------------------------------------------------
    // 1. Fetch & parse the site
    // -------------------------------------------------
    const url = domain.startsWith('http') ? domain : `https://${domain}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(9000) });
    if (!res.ok) throw new Error('Failed to fetch site');

    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $('title').first().text().trim() || 'Untitled';
    const desc = $('meta[name="description"]').attr('content')?.trim() || 'No description.';

    // Find sitemap (common locations)
    const sitemapMatch = html.match(/<link[^>]+rel=["']sitemap["'][^>]+href=["']([^"']+)["']/i);
    const sitemapUrl = sitemapMatch ? new URL(sitemapMatch[1], url).href : null;

    // Extract unique internal paths (no #, no external)
    const paths = new Set<string>();
    $('a[href]').each((_, el) => {
      let href = $(el).attr('href')!.trim();
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
      try {
        const full = new URL(href, url);
        if (full.origin !== new URL(url).origin) return;
        const clean = full.pathname + full.search;
        if (clean && clean !== '/') paths.add(clean);
      } catch {}
    });

    const pathList = Array.from(paths).slice(0, 60); // limit tokens

    // -------------------------------------------------
    // 2. Dynamic AI prompt
    // -------------------------------------------------
    const prompt = `You are an SEO & crawling expert. Generate a **valid robots.txt** file for:

Domain: ${url}
Title: ${title}
Description: ${desc}
Sitemap (if found): ${sitemapUrl || 'none detected'}
Internal paths discovered (sample): ${pathList.join(', ')}

INSTRUCTIONS:
- Use standard robots.txt syntax.
- Decide which paths to Disallow (e.g. /admin, /login, /wp-admin, /cgi-bin, /private).
- Allow important public areas.
- Include Sitemap: line if URL exists.
- Add helpful comments with #.
- Keep it under 500 bytes.
- Output **only** the robots.txt content – no Markdown, no fences.

EXAMPLE:
# robots.txt for example.com
User-agent: *
Disallow: /admin/
Disallow: /login/
Allow: /
Sitemap: https://example.com/sitemap.xml

--- BEGIN OUTPUT ---`;

    // -------------------------------------------------
    // 3. Call OpenRouter (free model)
    // -------------------------------------------------
    const llmRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 600,
        temperature: 0.2,
      }),
    });

    if (!llmRes.ok) {
      const err = await llmRes.text();
      throw new Error(`OpenRouter error: ${err}`);
    }

    const data = await llmRes.json();
    const robotsTxt = data.choices?.[0]?.message?.content?.trim() ?? '# robots.txt generation failed';

    return NextResponse.json({ content: robotsTxt });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
