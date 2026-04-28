import axios from 'axios';
import * as cheerio from 'cheerio';
import { Wheel } from '@/types';

interface Cache { data: Wheel[]; fetchedAt: number; }

const CACHE_TTL_MS = 5 * 60 * 1000;
let cache: Cache | null = null;

export async function getWheels(): Promise<Wheel[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) return cache.data;
  const data = await scrapeWheels();
  cache = { data, fetchedAt: Date.now() };
  return data;
}

export function clearCache(): void { cache = null; }

async function scrapeWheels(): Promise<Wheel[]> {
  const { data: html } = await axios.get('https://forgiato.com/wheels', {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ForgiataDealer/1.0)' },
  });
  const $ = cheerio.load(html);
  const wheels: Wheel[] = [];

  $('.wheel-card').each((_, el) => {
    const name = $(el).find('.wheel-title').text().trim();
    const series = $(el).find('.wheel-series').text().trim();
    let imageUrl = $(el).find('img').first().attr('src') || '';
    const href = $(el).find('a').first().attr('href') || '';
    const slug = href.split('/').filter(Boolean).pop() || '';

    if (imageUrl.startsWith('/')) imageUrl = `https://forgiato.com${imageUrl}`;
    if (name && imageUrl) wheels.push({ name, series: series || 'Uncategorized', imageUrl, slug });
  });

  return wheels;
}
