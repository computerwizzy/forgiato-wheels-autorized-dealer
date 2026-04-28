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

const VALID_BODY = {
  wheelName: "D'Uno",
  name: 'John Smith',
  email: 'john@example.com',
  phone: '555-1234',
  vehicleYear: '2023',
  vehicleMake: 'BMW',
  vehicleModel: 'M5',
};

test('returns 200 with all required fields', async () => {
  const res = await POST(makeRequest(VALID_BODY));
  const body = await res.json();
  expect(res.status).toBe(200);
  expect(body.success).toBe(true);
});

test('returns 400 when vehicle fields missing', async () => {
  const res = await POST(makeRequest({ wheelName: "D'Uno", name: 'John', email: 'j@j.com', phone: '555' }));
  expect(res.status).toBe(400);
});

test('returns 400 when contact fields missing', async () => {
  const res = await POST(makeRequest({ wheelName: "D'Uno", vehicleYear: '2023', vehicleMake: 'BMW', vehicleModel: 'M5' }));
  expect(res.status).toBe(400);
});
