import * as fs from 'fs';
import * as path from 'path';
import { Wheel } from '@/types';

interface Cache { data: Wheel[]; fetchedAt: number; }

const CACHE_TTL_MS = 5 * 60 * 1000;
const DATA_FILE = path.join(process.cwd(), 'src/data/wheels.json');
let cache: Cache | null = null;

export async function getWheels(): Promise<Wheel[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) return cache.data;
  const data: Wheel[] = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  cache = { data, fetchedAt: Date.now() };
  return data;
}

export function clearCache(): void { cache = null; }

// kept for test compatibility
export function parseWheels(html: string): Wheel[] {
  const cheerio = require('cheerio');
  const $ = cheerio.load(html);
  const wheels: Wheel[] = [];
  const seen = new Set<string>();

  $('a[href*="/wheels/"]').each((_: number, el: Element) => {
    const href = $(el).attr('href') || '';
    const parts = href.split('/').filter(Boolean);
    const wheelsIdx = parts.indexOf('wheels');
    if (wheelsIdx < 0) return;

    const slug = parts[parts.length - 1] || '';
    if (!slug || slug === 'wheels' || seen.has(slug)) return;

    const img = $(el).find('img').first();
    let imageUrl = img.attr('src') || img.attr('data-src') || '';
    if (!imageUrl) return;
    if (imageUrl.startsWith('/')) imageUrl = `https://forgiato.com${imageUrl}`;

    const alt = img.attr('alt') || '';
    const nameMatch = alt.match(/^Forgiato\s+(.+?)\s+custom forged wheel/i);
    const name = nameMatch ? nameMatch[1] : slug;

    const seriesRaw = parts[wheelsIdx + 1] || '';
    const series = seriesRaw.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());

    seen.add(slug);
    wheels.push({ name, series: series || 'Uncategorized', imageUrl, slug });
  });

  return wheels;
}
