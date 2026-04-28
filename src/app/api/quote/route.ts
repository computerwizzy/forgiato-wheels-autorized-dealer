import { NextRequest, NextResponse } from 'next/server';
import { QuoteFormData } from '@/types';

export async function POST(req: NextRequest) {
  const body: Partial<QuoteFormData> = await req.json();
  const { wheelName, name, email, phone, vehicleYear, vehicleMake, vehicleModel } = body;

  if (!wheelName || !name || !email || !phone || !vehicleYear || !vehicleMake || !vehicleModel) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  console.log('[Quote Request]', {
    wheel: wheelName,
    contact: { name, email, phone },
    vehicle: { year: vehicleYear, make: vehicleMake, model: vehicleModel },
    preferences: { size: body.sizePreference, finish: body.finishPreference },
    message: body.message,
  });

  return NextResponse.json({ success: true });
}
