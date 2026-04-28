/**
 * @jest-environment node
 */
import axios from 'axios';
import { getWheels, clearCache } from '@/lib/scraper';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const MOCK_HTML = `
<html><body>
  <div class="wheel-card">
    <a href="/wheels/d-uno">
      <img src="/images/d-uno.jpg" alt="D'Uno">
      <h3 class="wheel-title">D'Uno</h3>
      <span class="wheel-series">Classics</span>
    </a>
  </div>
  <div class="wheel-card">
    <a href="/wheels/d-due">
      <img src="https://forgiato.com/images/d-due.jpg" alt="D'Due">
      <h3 class="wheel-title">D'Due</h3>
      <span class="wheel-series">Flow Forged</span>
    </a>
  </div>
</body></html>
`;

beforeEach(() => {
  clearCache();
  mockedAxios.get.mockResolvedValue({ data: MOCK_HTML });
});

afterEach(() => jest.clearAllMocks());

test('returns parsed wheels from HTML', async () => {
  const wheels = await getWheels();
  expect(wheels).toHaveLength(2);
  expect(wheels[0]).toEqual({
    name: "D'Uno",
    series: 'Classics',
    imageUrl: 'https://forgiato.com/images/d-uno.jpg',
    slug: 'd-uno',
  });
  expect(wheels[1]).toEqual({
    name: "D'Due",
    series: 'Flow Forged',
    imageUrl: 'https://forgiato.com/images/d-due.jpg',
    slug: 'd-due',
  });
});

test('caches results and does not re-fetch within TTL', async () => {
  await getWheels();
  await getWheels();
  expect(mockedAxios.get).toHaveBeenCalledTimes(1);
});

test('clearCache forces a fresh fetch on next call', async () => {
  await getWheels();
  clearCache();
  await getWheels();
  expect(mockedAxios.get).toHaveBeenCalledTimes(2);
});
