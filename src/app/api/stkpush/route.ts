import { NextResponse } from 'next/server';
import { getMpesaToken, generateMpesaPassword } from '@/lib/mpesa';

export async function POST(req: Request) {
  try {
    const { phoneNumber, amount, bundleId } = await req.json();

    // Format phone number to 2547XXXXXXXX or 2541XXXXXXXX
    let formattedPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = `254${formattedPhone.substring(1)}`;
    }

    const token = await getMpesaToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const shortcode = process.env.MPESA_SHORTCODE!;
    const passkey = process.env.MPESA_PASSKEY!;
    const password = generateMpesaPassword(shortcode, passkey, timestamp);

    const stkPayload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerBuyGoodsOnline', // Use 'CustomerPayBillOnline' if using Paybill
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: shortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/stkpush/callback`,
      AccountReference: `Bundle_${bundleId}`,
      TransactionDesc: `Purchase of ${bundleId}`,
    };

    const response = await fetch(
      'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest', // Use sandbox URL for testing
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stkPayload),
      }
    );

    const data = await response.json();

    if (data.ResponseCode === '0') {
      return NextResponse.json({ success: true, CheckoutRequestID: data.CheckoutRequestID });
    } else {
      return NextResponse.json({ success: false, message: data.CustomerMessage }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'STK Push failed' }, { status: 500 });
  }
}