// src/routes/api/stripe/checkout/+server.js
import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import {
  STRIPE_SECRET_KEY,
  SELLER_STRIPE_ACCOUNT_ID,
  PLATFORM_FEE_PERCENT
} from '$env/static/private';
import { PUBLIC_STORE_URL } from '$env/static/public';

const PLATFORM_FEE = parseFloat(PLATFORM_FEE_PERCENT ?? '5') / 100;

export async function POST({ request }) {
  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
    const { items, email, name, total } = await request.json();

    if (!items?.length) {
      return json({ error: 'Cart is empty.' }, { status: 400 });
    }

    const totalCents = Math.round(total * 100);
    const platformFeeCents = Math.round(totalCents * PLATFORM_FEE);

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description?.slice(0, 200) || '',
          metadata: { product_id: item.id }
        },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.qty
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      customer_email: email,
      payment_intent_data: {
        application_fee_amount: platformFeeCents,
        transfer_data: {
          destination: SELLER_STRIPE_ACCOUNT_ID
        },
        metadata: {
          platform_fee_cents: platformFeeCents,
          seller_payout_cents: totalCents - platformFeeCents,
          platform_fee_pct: '5%',
          customer_name: name || ''
        }
      },
      success_url: `${PUBLIC_STORE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${PUBLIC_STORE_URL}/checkout`,
      metadata: {
        items: JSON.stringify(items.map(i => ({ id: i.id, qty: i.qty }))),
        customer_email: email,
        customer_name: name || ''
      }
    });

    return json({ url: session.url });
  } catch (err) {
    console.error('[Stripe checkout error]', err);
    return json({ error: err.message || 'Stripe error.' }, { status: 500 });
  }
}
