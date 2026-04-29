import { NextRequest, NextResponse } from 'next/server';
import { QuoteFormData } from '@/types';

export async function POST(req: NextRequest) {
  const body: Partial<QuoteFormData> = await req.json();
  const { wheelName, wheelImageUrl, name, email, phone, vehicleYear, vehicleMake, vehicleModel } = body;

  if (!wheelName || !name || !email || !phone || !vehicleYear || !vehicleMake || !vehicleModel) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const sheetsUrl = process.env.GOOGLE_SHEETS_URL;
  if (sheetsUrl) {
    try {
      await fetch(sheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
