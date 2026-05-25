// src/routes/api/webhook/stripe/+server.js
import { json, error } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';

export async function POST({ request }) {
  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[Stripe webhook] Signature verification failed:', err.message);
    throw error(400, 'Webhook signature mismatch');
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      await fulfillOrder({
        method: 'stripe',
        email: session.customer_email,
        itemsJson: session.metadata?.items,
        sessionId: session.id,
        amountTotal: session.amount_total / 100,
        platformFee: session.payment_intent?.application_fee_amount / 100
      });
      break;
    }

    case 'payment_intent.payment_failed': {
      console.warn('[Stripe] Payment failed:', event.data.object.id);
      break;
    }

    default:
      console.log(`[Stripe webhook] Unhandled event: ${event.type}`);
  }

  return json({ received: true });
}

async function fulfillOrder({ method, email, itemsJson, sessionId, amountTotal, platformFee }) {
  let items = [];
  try {
    items = JSON.parse(itemsJson || '[]');
  } catch {}

  console.log('[Order fulfilled]', {
    method,
    email,
    items,
    sessionId,
    amountTotal,
    platformFee,
    sellerPayout: amountTotal - (platformFee || amountTotal * 0.05)
  });

  // TODO: integrate your email/delivery service here
  // e.g. await sendDownloadEmail({ email, items });
  // e.g. await db.orders.create({ email, items, sessionId, ... });
}
