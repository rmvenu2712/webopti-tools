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
    // 1. Fetch the page
    // -------------------------------------------------
    const url = domain.startsWith('http') ? domain : `https://${domain}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error('Could not fetch site');

    const html = await res.text();
    const $ = cheerio.load(html);

    // -------------------------------------------------
    // 2. Extract useful data
    // -------------------------------------------------
    const siteTitle = $('title').first().text().trim() || 'Untitled Site';
    const siteDesc =
      $('meta[name="description"]').attr('content')?.trim() ||
      $('meta[property="og:description"]').attr('content')?.trim() ||
      'No description.';

    // All <a> tags – up to 80 to stay under token limits
    const rawLinks: { text: string; href: string }[] = [];
    $('a').each((_, el) => {
      const txt = $(el).text().trim();
      let href = $(el).attr('href')?.trim();
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
      if (!href.startsWith('http')) href = new URL(href, url).href;
      if (rawLinks.some(l => l.href === href)) return; // dedupe
      rawLinks.push({ text: txt, href });
      if (rawLinks.length >= 80) return false;
    });

    // -------------------------------------------------
    // 3. Build a **purely dynamic** prompt
    // -------------------------------------------------
    const prompt = `You are an expert at creating llms.txt files.
The goal is a **Markdown** file that helps LLMs understand the site.
Use ONLY the data below – do **not** invent anything.

--- SITE DATA ---
Title: ${siteTitle}
Description: ${siteDesc}
Links (max 80, JSON):
${JSON.stringify(rawLinks, null, 2)}

--- INSTRUCTIONS ---
1. Start with a top-level heading that captures the site’s purpose (e.g. "# Example.com – AI News Hub").
2. Create **any sections you think are useful** (Overview, Products, Blog, Contact, Policies, Social, etc.).
3. For every link:
   - Give a **short, natural description** (1 line).
   - Use Markdown link syntax: [Description](full-url)
   - If the link text is empty or meaningless, write "[No Title](url): Placeholder for additional content."
4. Group related links under the same heading.
5. End with a final link to the home page: [www.domain.com](https://domain.com): The official website.
6. Keep the whole file under 1500 words.
7. **Output ONLY the Markdown** – no explanations, no code fences.

--- BEGIN OUTPUT ---`;

    // -------------------------------------------------
    // 4. Call OpenRouter (free Mistral)
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
        max_tokens: 2000,
        temperature: 0.3, // low for consistency
      }),
    });

    if (!llmRes.ok) {
      const err = await llmRes.text();
      throw new Error(`OpenRouter error: ${err}`);
    }

    const data = await llmRes.json();
    const markdown = data.choices?.[0]?.message?.content?.trim() ?? 'Generation failed';

    return NextResponse.json({ content: markdown });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
