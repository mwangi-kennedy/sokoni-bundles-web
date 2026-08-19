import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const resultCode = body.Body.stkCallback.ResultCode;

  if (resultCode === 0) {
    // Payment Successful
    const callbackData = body.Body.stkCallback.CallbackMetadata.Item;
    const amount = callbackData.find((item: any) => item.Name === 'Amount')?.Value;
    const mpesaReceiptNumber = callbackData.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value;
    const phoneNumber = callbackData.find((item: any) => item.Name === 'PhoneNumber')?.Value;

    // TODO: 1. Save transaction to database (e.g. Supabase, MongoDB, or SQL)
    // TODO: 2. Trigger automated fulfillment (B2C / Airtime API / Safaricom Partner API to send bundle)

    console.log(`Payment received from ${phoneNumber} for KSh ${amount}. Receipt: ${mpesaReceiptNumber}`);
  } else {
    // Payment failed or cancelled by user
    console.log('Payment failed or cancelled:', body.Body.stkCallback.ResultDesc);
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
}