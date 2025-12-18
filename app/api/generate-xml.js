// pages/api/generate-xml.js
import axios from "axios";
import * as cheerio from "cheerio";

function normalizeUrl(base, link) {
  try {
    return new URL(link, base).href.split("#")[0];
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const startUrl = req.query.url;
  if (!startUrl) return res.status(400).send("Missing URL");

  let baseHost;
  try {
    baseHost = new URL(startUrl).host; // keep www or non-www
  } catch {
    return res.status(400).send("Invalid URL");
  }

  const visited = new Set();
  const queue = [startUrl];

  while (queue.length) {
    const current = queue.shift();
    if (visited.has(current)) continue;

    try {
      const { data } = await axios.get(current, {
        timeout: 12000,
        headers: { "User-Agent": "Sitemap-Generator-Bot/1.0" },
      });
      visited.add(current);

      const $ = cheerio.load(data);
      $("a[href]").each((_, el) => {
        const href = $(el).attr("href");
        if (!href) return;
        const abs = normalizeUrl(current, href);
        if (abs && abs.includes(baseHost) && !visited.has(abs) && !queue.includes(abs)) {
          queue.push(abs);
        }
      });
    } catch (e) {
      console.warn("Skip:", current);
    }
  }

  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
  xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;
  xml += `<!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->\n`;

  visited.forEach((u) => {
    const isHome = u === startUrl || u === `${startUrl}/`;
    const pri = isHome ? "1.00" : "0.80";
    xml += `  <url>\n`;
    xml += `    <loc>${u}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <priority>${pri}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Content-Disposition", `attachment; filename="sitemap.xml"`);
  res.send(xml);
}
