// app/api/generate-xml/route.ts
import { NextRequest } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
  export const runtime = 'edge';
/**
 * Keep the original host (www or non-www) that the user typed.
 */
function normalizeUrl(baseUrl: string, link: string): string | null {
  try {
    const url = new URL(link, baseUrl);
    return url.href.split("#")[0];
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const startUrl = searchParams.get("url");

  if (!startUrl) {
    return new Response("Missing URL", { status: 400 });
  }

  let baseHost: string;
  try {
    const u = new URL(startUrl);
    baseHost = u.host;               // e.g. "www.vijayfinancialservices.com"
  } catch {
    return new Response("Invalid URL", { status: 400 });
  }

  const visited = new Set<string>();
  const queue: string[] = [startUrl];

  // --------------------------------------------------------------- CRAWL
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;

    try {
      const { data } = await axios.get(current, {
        timeout: 12_000,
        headers: { "User-Agent": "Sitemap-Generator-Bot/1.0" },
      });
      visited.add(current);

      const $ = cheerio.load(data);
      $("a[href]").each((_i, el) => {
        const href = $(el).attr("href");
        if (!href) return;

        const abs = normalizeUrl(current, href);          // use *current* page as base
        if (abs && abs.includes(baseHost) && !visited.has(abs) && !queue.includes(abs)) {
          queue.push(abs);
        }
      });
    } catch (err) {
      console.warn("Skip:", current, (err as Error).message);
    }
  }

  // --------------------------------------------------------------- BUILD XML
  const now = new Date().toISOString(); // 2025-11-09T08:21:34.846Z  (or +00:00 if you prefer)

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
  xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;
  xml += `<!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->\n`;

  visited.forEach((url) => {
    const isHome = url === startUrl || url === `${startUrl}/`;
    const priority = isHome ? "1.00" : "0.80";

    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Content-Disposition": `attachment; filename="sitemap.xml"`,
    },
  });
}
