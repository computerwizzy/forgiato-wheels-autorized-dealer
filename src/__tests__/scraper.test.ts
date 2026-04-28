/**
 * @jest-environment node
 */
import { getWheels, clearCache, parseWheels } from '@/lib/scraper';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn().mockReturnValue(false),
  readFileSync: jest.fn(),
}));

jest.mock('puppeteer-extra', () => ({
  use: jest.fn(),
  launch: jest.fn(),
}));
jest.mock('puppeteer-extra-plugin-stealth', () => jest.fn(() => ({})));

import puppeteer from 'puppeteer-extra';
const mockedPuppeteer = puppeteer as jest.Mocked<typeof puppeteer>;

// Mirrors forgiato.com's actual HTML structure
const MOCK_HTML = `
<html><body>
  <a href="/wheels/ecl/d-uno/">
    <img src="/static/uploads/website/wheels/d-uno.png"
         alt="Forgiato D'Uno custom forged wheel — ECL">
  </a>
  <a href="/wheels/flat-forging/d-due/">
    <img src="https://forgiato.com/static/uploads/website/wheels/d-due.png"
         alt="Forgiato D'Due custom forged wheel — Flat Forging">
  </a>
</body></html>
`;

function makeMockBrowser(html: string) {
  const mockPage = {
    setViewport: jest.fn().mockResolvedValue(undefined),
    goto: jest.fn().mockResolvedValue(undefined),
    evaluate: jest.fn().mockResolvedValue(0),
    waitForSelector: jest.fn().mockResolvedValue(undefined),
    content: jest.fn().mockResolvedValue(html),
  };
  return {
    newPage: jest.fn().mockResolvedValue(mockPage),
    close: jest.fn().mockResolvedValue(undefined),
  };
}

beforeEach(() => {
  clearCache();
  jest.clearAllMocks();
  jest.useFakeTimers();
  const fs = require('fs');
  fs.existsSync.mockReturnValue(false);
  (mockedPuppeteer.launch as jest.Mock).mockResolvedValue(makeMockBrowser(MOCK_HTML));
});

afterEach(() => {
  jest.useRealTimers();
});

test('parseWheels extracts name from alt text and series from URL', () => {
  const wheels = parseWheels(MOCK_HTML);
  expect(wheels).toHaveLength(2);
  expect(wheels[0]).toEqual({
    name: "D'Uno",
    series: 'Ecl',
    imageUrl: 'https://forgiato.com/static/uploads/website/wheels/d-uno.png',
    slug: 'd-uno',
  });
  expect(wheels[1]).toEqual({
    name: "D'Due",
    series: 'Flat Forging',
    imageUrl: 'https://forgiato.com/static/uploads/website/wheels/d-due.png',
    slug: 'd-due',
  });
});

test('parseWheels skips duplicate slugs', () => {
  const html = `
    <a href="/wheels/ecl/d-uno/"></a>
    <a href="/wheels/ecl/d-uno/">
      <img src="/static/uploads/website/wheels/d-uno.png" alt="Forgiato D'Uno custom forged wheel — ECL">
    </a>
    <a href="/wheels/ecl/d-uno/">
      <img src="/static/uploads/website/wheels/d-uno.png" alt="Forgiato D'Uno custom forged wheel — ECL">
    </a>
  `;
  const wheels = parseWheels(html);
  expect(wheels).toHaveLength(1);
});

test('getWheels launches browser and returns parsed wheels', async () => {
  const wheelsPromise = getWheels();
  await jest.runAllTimersAsync();
  const wheels = await wheelsPromise;
  expect(mockedPuppeteer.launch).toHaveBeenCalledTimes(1);
  expect(wheels).toHaveLength(2);
});

test('caches results and does not re-launch browser within TTL', async () => {
  const p1 = getWheels();
  await jest.runAllTimersAsync();
  await p1;
  const p2 = getWheels();
  await jest.runAllTimersAsync();
  await p2;
  expect(mockedPuppeteer.launch).toHaveBeenCalledTimes(1);
});

test('clearCache forces a fresh browser launch on next call', async () => {
  const p1 = getWheels();
  await jest.runAllTimersAsync();
  await p1;
  clearCache();
  const p2 = getWheels();
  await jest.runAllTimersAsync();
  await p2;
  expect(mockedPuppeteer.launch).toHaveBeenCalledTimes(2);
});
