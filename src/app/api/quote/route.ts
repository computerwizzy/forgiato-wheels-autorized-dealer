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

  // Send SMS via Podium
  const refreshToken = process.env.PODIUM_REFRESH_TOKEN;
  if (refreshToken) {
    try {
      const tokenRes = await fetch('https://accounts.podium.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: process.env.PODIUM_CLIENT_ID,
          client_secret: process.env.PODIUM_CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      });
      const { access_token } = await tokenRes.json();

      if (access_token) {
        const smsBody = `New Forgiato quote!\nWheel: ${wheelName}\nSize: ${body.sizePreference || 'N/A'}\nFinish: ${body.finishPreference || 'N/A'}\nFrom: ${name}\nPhone: ${phone}\nVehicle: ${vehicleYear} ${vehicleMake} ${vehicleModel}${wheelImageUrl ? `\n${wheelImageUrl}` : ''}`;
        await fetch('https://api.podium.com/v4/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
          },
          body: JSON.stringify({
            body: smsBody,
            locationUid: process.env.PODIUM_LOCATION_UID,
            channel: {
              identifier: process.env.PODIUM_DEALER_PHONE,
              type: 'phone',
            },
          }),
        });
      }
    } catch (err) {
      console.error('[Quote] Podium SMS error:', err);
    }
  }

  return NextResponse.json({ success: true });
}
