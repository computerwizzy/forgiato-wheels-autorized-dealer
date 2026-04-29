import { NextRequest, NextResponse } from 'next/server';
import { QuoteFormData } from '@/types';

export async function POST(req: NextRequest) {
  const body: Partial<QuoteFormData> = await req.json();
  const { wheelName, wheelImageUrl, name, email, phone, vehicleYear, vehicleMake, vehicleModel } = body;

  if (!wheelName || !name || !email || !phone || !vehicleYear || !vehicleMake || !vehicleModel) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Block bots: phone must be at least 10 digits, name must be letters only
  const phoneDigits = phone.replace(/\D/g, '');
  const validPhone = phoneDigits.length >= 10;
  const validName = name.trim().length >= 5 && /^[a-zA-ZÀ-ÖØ-öø-ÿ'\-]+(\s+[a-zA-ZÀ-ÖØ-öø-ÿ'\-]+)+$/.test(name.trim());
  if (!validPhone || !validName) {
    return NextResponse.json({ error: 'Invalid submission' }, { status: 422 });
  }

  const sheetsUrl = process.env.GOOGLE_SHEETS_URL;
  if (sheetsUrl) {
    try {
      await fetch(sheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.SHEETS_SECRET ?? '',
          wheelName,
          wheelImageUrl: wheelImageUrl ?? '',
          name,
          email,
          phone,
          vehicleYear,
          vehicleMake,
          vehicleModel,
          sizePreference: body.sizePreference ?? '',
          finishPreference: body.finishPreference ?? '',
          message: body.message ?? '',
        }),
      });
    } catch (err) {
      console.error('[Quote] Google Sheets error:', err);
    }
  }

  return NextResponse.json({ success: true });
}
