<script>
  import { cart, cartTotal, platformFee } from '$lib/stores/cart.js';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let paymentMethod = 'card'; // 'card' | 'crypto'
  let cryptoCurrency = 'BTC';
  let loading = false;
  let error = '';

  let email = '';
  let name = '';

  const cryptoCurrencies = [
    { id: 'BTC', label: '₿ Bitcoin', color: '#f7931a' },
    { id: 'ETH', label: 'Ξ Ethereum', color: '#627eea' },
    { id: 'USDC', label: '$ USD Coin', color: '#2775ca' },
    { id: 'SOL', label: '◎ Solana', color: '#9945ff' },
    { id: 'LTC', label: 'Ł Litecoin', color: '#bfbbbb' },
    { id: 'DOGE', label: 'Ð Dogecoin', color: '#c2a633' },
  ];

  async function handleCardCheckout() {
    if (!email || !name) { error = 'Please fill in all fields.'; return; }
    loading = true;
    error = '';
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: $cart,
          email,
          name,
          total: $cartTotal
        })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        error = data.error || 'Checkout failed. Please try again.';
      }
    } catch (e) {
      error = 'Network error. Please try again.';
    } finally {
      loading = false;
    }
  }

  async function handleCryptoCheckout() {
    if (!email) { error = 'Please enter your email.'; return; }
    loading = true;
    error = '';
    try {
      const res = await fetch('/api/coinbase/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: $cart,
          email,
          currency: cryptoCurrency,
          total: $cartTotal
        })
      });
      const data = await res.json();
      if (data.hosted_url) {
        window.location.href = data.hosted_url;
      } else {
        error = data.error || 'Crypto checkout failed. Please try again.';
      }
    } catch (e) {
      error = 'Network error. Please try again.';
    } finally {
      loading = false;
    }
  }

  function handleSubmit() {
    if (paymentMethod === 'card') handleCardCheckout();
    else handleCryptoCheckout();
  }
</script>

<svelte:head>
  <title>Checkout — CalcMod</title>
</svelte:head>

<div class="checkout-page">
  <div class="container">
    <h1 class="page-title">Checkout</h1>

    {#if $cart.length === 0}
      <div class="empty-state">
        <p>Your cart is empty.</p>
        <a href="/" class="btn btn-primary">Shop Now</a>
      </div>
    {:else}
      <div class="checkout-layout">

        <!-- FORM -->
        <div class="checkout-form">

          <!-- Contact -->
          <section class="form-section">
            <h2 class="section-title">
              <span class="step">01</span> Contact Info
            </h2>
            <div class="form-grid">
              <div class="form-field">
                <label for="name">Full Name</label>
                <input id="name" type="text" bind:value={name} placeholder="Jane Doe" />
              </div>
              <div class="form-field">
                <label for="email">Email <span class="req">*</span></label>
                <input id="email" type="email" bind:value={email} placeholder="jane@example.com" required />
                <span class="field-note">Download link will be sent here.</span>
              </div>
            </div>
          </section>

          <!-- Payment Method -->
          <section class="form-section">
            <h2 class="section-title">
              <span class="step">02</span> Payment Method
            </h2>

            <div class="method-tabs">
              <button
                class="method-tab"
                class:active={paymentMethod === 'card'}
                onclick={() => paymentMethod = 'card'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                Card / Bank
              </button>
              <button
                class="method-tab crypto-tab"
                class:active={paymentMethod === 'crypto'}
                onclick={() => paymentMethod = 'crypto'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.5 8h3a2 2 0 000-4H9a1 1 0 00-1 1v10a1 1 0 001 1h4a2.5 2.5 0 000-5H9.5"/>
                </svg>
                Crypto (Coinbase)
              </button>
            </div>

            {#if paymentMethod === 'card'}
              <div class="card-info">
                <div class="card-secure">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  Secured by Stripe. We never see your card details.
                </div>
                <p class="card-redirect">You'll be redirected to Stripe's secure checkout.</p>
                <div class="card-logos">
                  <span>Visa</span><span>Mastercard</span><span>Amex</span><span>Apple Pay</span><span>Google Pay</span>
                </div>
              </div>

            {:else}
              <div class="crypto-section">
                <p class="crypto-intro">
                  Pay via <strong>Coinbase Commerce</strong> — no account required.
                  Payments are confirmed on-chain.
                </p>
                <div class="crypto-grid">
                  {#each cryptoCurrencies as coin}
                    <button
                      class="coin-btn"
                      class:active={cryptoCurrency === coin.id}
                      onclick={() => cryptoCurrency = coin.id}
                      style="--coin-color: {coin.color}"
                    >
                      {coin.label}
                    </button>
                  {/each}
                </div>
                <div class="coinbase-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1652f0">
                    <circle cx="12" cy="12" r="10"/>
                    <path fill="white" d="M12 6a6 6 0 100 12A6 6 0 0012 6zm0 9.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"/>
                  </svg>
                  Powered by Coinbase Commerce
                </div>
              </div>
            {/if}
          </section>

          {#if error}
            <div class="error-box">{error}</div>
          {/if}

          <button
            class="btn btn-primary submit-btn"
            class:btn-crypto={paymentMethod === 'crypto'}
            onclick={handleSubmit}
            disabled={loading}
          >
            {#if loading}
              <span class="spinner"></span> Processing...
            {:else if paymentMethod === 'crypto'}
              Pay with {cryptoCurrency} →
            {:else}
              Pay ${$cartTotal.toFixed(2)} with Card →
            {/if}
          </button>
        </div>

        <!-- ORDER SUMMARY -->
        <div class="order-summary">
          <h2 class="os-title">Order Summary</h2>

          <div class="os-items">
            {#each $cart as item}
              <div class="os-item">
                <div class="os-item-info">
                  <span class="os-item-name">{item.name}</span>
                  <span class="os-item-qty">×{item.qty}</span>
                </div>
                <span class="os-item-price">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            {/each}
          </div>

          <div class="os-breakdown">
            <div class="os-row">
              <span>Subtotal</span>
              <span>${$cartTotal.toFixed(2)}</span>
            </div>
            <div class="os-row">
              <span>Platform fee (5%)</span>
              <span class="fee">${$platformFee.toFixed(2)}</span>
            </div>
          </div>

          <div class="os-total">
            <span>Total</span>
            <span>${$cartTotal.toFixed(2)}</span>
          </div>

          <div class="os-note">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.13 1.18a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 6.37"/>
            </svg>
            Digital products — instant email delivery after payment.
          </div>
        </div>

      </div>
    {/if}
  </div>
</div>

<style>
.checkout-page { padding: 48px 0 80px; }

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 40px;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 40px;
  align-items: start;
}

@media (max-width: 768px) {
  .checkout-layout { grid-template-columns: 1fr; }
}

.form-section {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.step {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--accent);
  background: rgba(200,241,53,0.1);
  border: 1px solid rgba(200,241,53,0.2);
  padding: 2px 8px;
  border-radius: 2px;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-field label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.req { color: var(--accent); }

.field-note {
  font-size: 11px;
  color: var(--text3);
  font-family: var(--font-mono);
}

/* METHOD TABS */
.method-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.method-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text2);
  font-family: var(--font-mono);
  font-size: 13px;
  transition: all 0.15s;
  flex: 1;
  justify-content: center;
}

.method-tab.active {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(200,241,53,0.05);
}

.method-tab.crypto-tab.active {
  border-color: #1652f0;
  color: #6b9bff;
  background: rgba(22,82,240,0.08);
}

/* CARD */
.card-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-secure {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text2);
  background: var(--bg3);
  border: 1px solid var(--border);
  padding: 10px 14px;
  border-radius: 4px;
}

.card-redirect { font-size: 13px; color: var(--text2); }

.card-logos {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.card-logos span {
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 3px 8px;
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 2px;
  color: var(--text2);
}

/* CRYPTO */
.crypto-intro {
  font-size: 14px;
  color: var(--text2);
  margin-bottom: 16px;
  line-height: 1.6;
}

.crypto-intro strong { color: var(--text); }

.crypto-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.coin-btn {
  padding: 10px;
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text2);
  cursor: pointer;
  transition: all 0.15s;
}

.coin-btn:hover { border-color: var(--coin-color); color: var(--text); }
.coin-btn.active {
  border-color: var(--coin-color);
  color: var(--coin-color);
  background: rgba(255,255,255,0.03);
}

.coinbase-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text3);
}

/* SUBMIT */
.error-box {
  background: rgba(255,69,69,0.1);
  border: 1px solid rgba(255,69,69,0.3);
  color: var(--red);
  padding: 12px 16px;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 13px;
  margin-bottom: 16px;
}

.submit-btn {
  width: 100%;
  justify-content: center;
  padding: 16px;
  font-size: 15px;
}

.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(0,0,0,0.3);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ORDER SUMMARY */
.order-summary {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 24px;
  position: sticky;
  top: 80px;
}

.os-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
}

.os-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.os-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.os-item-info { display: flex; flex-direction: column; gap: 2px; flex: 1; }

.os-item-name { font-size: 13px; color: var(--text); line-height: 1.3; }

.os-item-qty {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text3);
}

.os-item-price {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
}

.os-breakdown {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border);
}

.os-row {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text2);
}

.os-row .fee { color: var(--text3); }

.os-total {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
}

.os-note {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text3);
  padding: 10px 12px;
  background: var(--bg3);
  border-radius: 3px;
}
</style>
