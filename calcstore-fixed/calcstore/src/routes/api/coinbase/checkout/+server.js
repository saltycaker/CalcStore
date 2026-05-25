// src/routes/api/coinbase/checkout/+server.js
import { json } from '@sveltejs/kit';
import { COINBASE_API_KEY, PLATFORM_FEE_PERCENT } from '$env/static/private';
import { PUBLIC_STORE_URL } from '$env/static/public';

const PLATFORM_FEE = parseFloat(PLATFORM_FEE_PERCENT ?? '5') / 100;

export async function POST({ request }) {
  try {
    const { items, email, currency, total } = await request.json();

    if (!items?.length) {
      return json({ error: 'Cart is empty.' }, { status: 400 });
    }

    const platformFee = +(total * PLATFORM_FEE).toFixed(2);
    const sellerPayout = +(total * (1 - PLATFORM_FEE)).toFixed(2);
    const description = items.map(i => `${i.name} ×${i.qty}`).join(', ');

    const payload = {
      name: 'CalcMod Order',
      description,
      local_price: {
        amount: total.toFixed(2),
        currency: 'USD'
      },
      pricing_type: 'fixed_price',
      requested_info: ['email'],
      metadata: {
        customer_email: email,
        items: JSON.stringify(items.map(i => ({ id: i.id, qty: i.qty }))),
        platform_fee_usd: platformFee.toString(),
        seller_payout_usd: sellerPayout.toString(),
        platform_fee_pct: '5%',
        preferred_crypto: currency
      },
      redirect_url: `${PUBLIC_STORE_URL}/checkout/success?method=crypto`,
      cancel_url: `${PUBLIC_STORE_URL}/checkout`
    };

    const res = await fetch('https://api.commerce.coinbase.com/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': COINBASE_API_KEY,
        'X-CC-Version': '2018-03-22'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.error?.message || 'Coinbase Commerce error.';
      console.error('[Coinbase checkout error]', data);
      return json({ error: msg }, { status: res.status });
    }

    const charge = data.data;

    return json({
      charge_id: charge.id,
      hosted_url: charge.hosted_url,
      expires_at: charge.expires_at,
      addresses: charge.addresses,
      platform_fee: platformFee,
      seller_payout: sellerPayout
    });
  } catch (err) {
    console.error('[Coinbase checkout error]', err);
    return json({ error: err.message || 'Internal error.' }, { status: 500 });
  }
}
