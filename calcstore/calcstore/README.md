# CalcMod Store — SvelteKit + Stripe + Coinbase Commerce

A full-featured digital goods store for calculator mods, scripts, and firmware.
Takes a **5% platform fee** on every sale via Stripe Connect and Coinbase Commerce.

---

## Stack

- **Framework**: SvelteKit 2 (adapter-node)
- **Card Payments**: Stripe Checkout + Stripe Connect (seller payouts)
- **Crypto Payments**: Coinbase Commerce (BTC, ETH, USDC, SOL, LTC, DOGE, + more)
- **Platform fee**: 5% on every transaction

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

| Variable                  | Description                                         |
|---------------------------|-----------------------------------------------------|
| `STRIPE_SECRET_KEY`       | Stripe secret key (`sk_live_...`)                   |
| `PUBLIC_STRIPE_KEY`       | Stripe publishable key (`pk_live_...`)              |
| `STRIPE_WEBHOOK_SECRET`   | Stripe webhook signing secret (`whsec_...`)         |
| `SELLER_STRIPE_ACCOUNT_ID`| Stripe Connect account ID of the seller (`acct_...`)|
| `COINBASE_API_KEY`        | Coinbase Commerce API key                           |
| `COINBASE_WEBHOOK_SECRET` | Coinbase Commerce webhook shared secret             |
| `PLATFORM_FEE_PERCENT`    | Platform cut, default `5`                           |
| `PUBLIC_STORE_URL`        | Your store's public URL                             |

### 3. Stripe Setup

1. Enable **Stripe Connect** in your Stripe Dashboard
2. Create a connected account for each seller → get their `acct_...` ID
3. Set `SELLER_STRIPE_ACCOUNT_ID` in `.env`
4. Register webhook endpoint: `https://yourdomain.com/api/webhook/stripe`
   - Listen for: `checkout.session.completed`, `payment_intent.payment_failed`
5. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

### 4. Coinbase Commerce Setup

1. Create account at [commerce.coinbase.com](https://commerce.coinbase.com)
2. Go to Settings → API Keys → Create an API Key
3. Go to Settings → Webhooks → Add endpoint: `https://yourdomain.com/api/webhook/coinbase`
4. Copy the shared secret to `COINBASE_WEBHOOK_SECRET`

> **Payout note**: Coinbase Commerce pays the full amount to your account.
> You manually pay sellers their 95% cut. Consider using the metadata
> (`seller_payout_usd`) stored on each charge to track what's owed.

### 5. Run dev server

```bash
npm run dev
```

### 6. Build for production

```bash
npm run build
node build/index.js
```

---

## Fee Structure

Every sale:

| Party      | Amount       |
|------------|--------------|
| Customer   | Pays full price |
| Platform   | 5% of sale   |
| Seller     | 95% of sale  |

For **Stripe**: The `application_fee_amount` is automatically deducted and
the remainder is transferred to the seller's Stripe Connect account.

For **Crypto (Coinbase)**: The full amount lands in your Coinbase Commerce
account. Seller payout is recorded in `metadata.seller_payout_usd`
on each charge — pay sellers manually or build an automated payout system.

---

## Fulfillment

After a successful payment, the webhooks log the order. To actually deliver
digital goods, integrate your preferred email/delivery provider in:

- `src/routes/api/webhook/stripe/+server.js` → `fulfillOrder()`
- `src/routes/api/webhook/coinbase/+server.js` → `fulfillCryptoOrder()`

Recommended: [Resend](https://resend.com), [SendGrid](https://sendgrid.com),
or [Postmark](https://postmarkapp.com) for transactional email.

---

## Crypto currencies supported

Coinbase Commerce accepts (customer chooses at hosted checkout):
BTC · ETH · USDC · SOL · LTC · DOGE · DAI · APE · SHIB · XRP · MATIC

---

## Project Structure

```
src/
├── routes/
│   ├── +layout.svelte          # App shell + nav + footer
│   ├── +page.svelte            # Shop homepage
│   ├── product/[id]/           # Product detail
│   ├── cart/                   # Cart page
│   ├── checkout/               # Checkout + success
│   └── api/
│       ├── stripe/checkout/    # Create Stripe session
│       ├── coinbase/checkout/  # Create Coinbase charge
│       └── webhook/
│           ├── stripe/         # Stripe event handler
│           └── coinbase/       # Coinbase event handler
├── lib/
│   ├── products.js             # Product catalog + fee logic
│   ├── stores/cart.js          # Reactive cart (localStorage)
│   └── components/
│       ├── Navbar.svelte
│       └── ProductCard.svelte
└── app.css                     # Global design system
```
