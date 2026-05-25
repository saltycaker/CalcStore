// src/routes/api/webhook/coinbase/+server.js
import { json, error } from '@sveltejs/kit';
import crypto from 'crypto';
import { COINBASE_WEBHOOK_SECRET } from '$env/static/private';

export async function POST({ request }) {
  const sig = request.headers.get('x-cc-webhook-signature');
  const body = await request.text();

  const expectedSig = crypto
    .createHmac('sha256', COINBASE_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');

  if (sig !== expectedSig) {
    console.error('[Coinbase webhook] Signature mismatch');
    throw error(400, 'Invalid webhook signature');
  }

  let event;
  try {
    event = JSON.parse(body);
  } catch {
    throw error(400, 'Invalid JSON');
  }

  const { type, data } = event;

  switch (type) {
    case 'charge:confirmed': {
      await fulfillCryptoOrder(data);
      break;
    }
    case 'charge:failed': {
      console.warn('[Coinbase] Charge failed:', data.id);
      break;
    }
    case 'charge:delayed': {
      console.warn('[Coinbase] Charge delayed (underpaid?):', data.id);
      break;
    }
    case 'charge:resolved': {
      await fulfillCryptoOrder(data);
      break;
    }
    default:
      console.log(`[Coinbase webhook] Unhandled: ${type}`);
  }

  return json({ received: true });
}

async function fulfillCryptoOrder(charge) {
  const meta = charge.metadata || {};
  const email = meta.customer_email;
  const itemsJson = meta.items;
  const platformFee = parseFloat(meta.platform_fee_usd || 0);
  const sellerPayout = parseFloat(meta.seller_payout_usd || 0);

  let items = [];
  try { items = JSON.parse(itemsJson || '[]'); } catch {}

  const payments = charge.payments || [];
  const payment = payments[0];
  const cryptoUsed = payment?.value?.crypto?.currency || 'UNKNOWN';
  const cryptoAmount = payment?.value?.crypto?.amount || '0';

  console.log('[Crypto order fulfilled]', {
    email,
    items,
    chargeId: charge.id,
    cryptoUsed,
    cryptoAmount,
    usdTotal: charge.pricing?.local?.amount,
    platformFee,
    sellerPayout
  });

  // TODO: send download email, log to DB
  // await sendDownloadEmail({ email, items });
}
