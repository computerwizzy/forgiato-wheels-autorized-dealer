/**
 * @jest-environment node
 */
import { POST } from '@/app/api/quote/route';
import { NextRequest } from 'next/server';

function makeRequest(body: object) {
  return new NextRequest('http://localhost:3000/api/quote', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}

test('returns 200 with valid data', async () => {
  const res = await POST(makeRequest({
    wheelName: "D'Uno", name: 'John Smith', email: 'john@example.com', phone: '555-1234',
  }));
  const body = await res.json();
  expect(res.status).toBe(200);
  expect(body.success).toBe(true);
});

test('returns 400 when required fields missing', async () => {
  const res = await POST(makeRequest({ wheelName: "D'Uno" }));
  expect(res.status).toBe(400);
});
