import { NextRequest, NextResponse } from 'next/server';
import { QuoteFormData } from '@/types';

export async function POST(req: NextRequest) {
  const body: Partial<QuoteFormData> = await req.json();
  const { wheelName, name, email, phone } = body;

  if (!wheelName || !name || !email || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  console.log('[Quote Request]', { wheelName, name, email, phone, message: body.message });
  return NextResponse.json({ success: true });
}
