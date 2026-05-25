<script>
  import { cart, cartTotal, cartCount, platformFee, sellerPayout } from '$lib/stores/cart.js';
</script>

<svelte:head>
  <title>Cart — CalcMod</title>
</svelte:head>

<div class="cart-page">
  <div class="container">
    <h1 class="page-title">
      Your Cart
      {#if $cartCount > 0}
        <span class="count-badge">{$cartCount}</span>
      {/if}
    </h1>

    {#if $cart.length === 0}
      <div class="empty-cart">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </div>
        <h2>Cart is empty</h2>
        <p>Browse our products and add something cool.</p>
        <a href="/" class="btn btn-primary">Browse Products</a>
      </div>
    {:else}
      <div class="cart-layout">
        <div class="cart-items">
          {#each $cart as item (item.id)}
            <div class="cart-item">
              <div class="item-img">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4">
                  <rect x="2" y="3" width="20" height="18" rx="2"/>
                  <line x1="8" y1="7" x2="16" y2="7"/>
                  <line x1="8" y1="11" x2="16" y2="11"/>
                </svg>
              </div>

              <div class="item-info">
                <a href="/product/{item.id}" class="item-name">{item.name}</a>
                <span class="item-meta">{item.category} · Digital download</span>
              </div>

              <div class="item-qty">
                <button class="qty-btn" on:click={() => cart.updateQty(item.id, item.qty - 1)}>−</button>
                <span class="qty-num">{item.qty}</span>
                <button class="qty-btn" on:click={() => cart.updateQty(item.id, item.qty + 1)}>+</button>
              </div>

              <div class="item-price">
                ${(item.price * item.qty).toFixed(2)}
              </div>

              <button class="remove-btn" on:click={() => cart.removeItem(item.id)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          {/each}
        </div>

        <div class="cart-summary">
          <h2 class="summary-title">Order Summary</h2>

          <div class="summary-rows">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>${$cartTotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span>Platform fee (5%)</span>
              <span class="fee-amt">${$platformFee.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span>Seller payout</span>
              <span class="seller-amt">${$sellerPayout.toFixed(2)}</span>
            </div>
          </div>

          <div class="summary-total">
            <span>Total</span>
            <span>${$cartTotal.toFixed(2)}</span>
          </div>

          <a href="/checkout" class="btn btn-primary checkout-btn">
            Proceed to Checkout
          </a>

          <div class="payment-note">
            <p>We accept all major payment methods:</p>
            <div class="pay-chips">
              <span class="chip card">💳 Cards</span>
              <span class="chip">₿ BTC</span>
              <span class="chip">Ξ ETH</span>
              <span class="chip">◎ SOL</span>
              <span class="chip">$ USDC</span>
            </div>
          </div>

          <button class="clear-btn" on:click={() => cart.clear()}>Clear cart</button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
.cart-page { padding: 48px 0 80px; }

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 36px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.count-badge {
  font-family: var(--font-mono);
  font-size: 16px;
  background: var(--accent);
  color: #0a0a0a;
  padding: 2px 10px;
  border-radius: 99px;
  font-weight: 700;
}

.empty-cart {
  text-align: center;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.empty-icon { color: var(--text3); margin-bottom: 8px; }
.empty-cart h2 { font-size: 24px; font-weight: 700; }
.empty-cart p { color: var(--text2); font-size: 15px; }

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 40px;
  align-items: start;
}

@media (max-width: 768px) {
  .cart-layout { grid-template-columns: 1fr; }
}

.cart-items { display: flex; flex-direction: column; gap: 12px; }

.cart-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 16px;
  transition: border-color 0.15s;
}

.cart-item:hover { border-color: #3a3a3a; }

.item-img {
  width: 52px;
  height: 52px;
  background: var(--bg3);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }

.item-name { font-size: 15px; font-weight: 600; color: var(--text); transition: color 0.15s; }
.item-name:hover { color: var(--accent); }

.item-meta {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.item-qty { display: flex; align-items: center; gap: 8px; }

.qty-btn {
  width: 28px;
  height: 28px;
  background: var(--bg3);
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 3px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s;
}

.qty-btn:hover { border-color: var(--accent); color: var(--accent); }

.qty-num {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
  min-width: 20px;
  text-align: center;
}

.item-price {
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 700;
  color: var(--accent);
  min-width: 70px;
  text-align: right;
}

.remove-btn {
  background: transparent;
  color: var(--text3);
  padding: 4px;
  border-radius: 3px;
  transition: color 0.15s;
}

.remove-btn:hover { color: var(--red); }

.cart-summary {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 24px;
  position: sticky;
  top: 80px;
}

.summary-title { font-size: 18px; font-weight: 700; margin-bottom: 20px; }

.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text2);
}

.fee-amt { color: var(--text3); }
.seller-amt { color: var(--accent); }

.summary-total {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
}

.checkout-btn {
  width: 100%;
  justify-content: center;
  margin-bottom: 20px;
  padding: 14px;
  font-size: 14px;
}

.payment-note p {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 8px;
}

.pay-chips { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 16px; }

.chip {
  font-family: var(--font-mono);
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 2px;
  background: rgba(22,82,240,0.1);
  border: 1px solid rgba(22,82,240,0.25);
  color: #6b9bff;
}

.chip.card { background: var(--bg3); border-color: var(--border); color: var(--text2); }

.clear-btn {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text3);
  background: transparent;
  text-decoration: underline;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.clear-btn:hover { color: var(--red); }
</style>
