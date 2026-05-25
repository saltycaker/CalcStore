<script>
  import { cart } from '$lib/stores/cart.js';

  export let product;

  let added = false;

  function addToCart() {
    cart.addItem(product);
    added = true;
    setTimeout(() => added = false, 1500);
  }
</script>

<article class="card">
  <a href="/product/{product.id}" class="card-img-wrap">
    <div class="card-img">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3">
        <rect x="2" y="3" width="20" height="18" rx="2"/>
        <line x1="8" y1="7" x2="16" y2="7"/>
        <line x1="8" y1="11" x2="16" y2="11"/>
        <line x1="8" y1="15" x2="12" y2="15"/>
      </svg>
      <span class="card-category">{product.category}</span>
    </div>
    {#if product.badge}
      <span class="tag tag-{product.badge === 'new' ? 'new' : 'hot'} card-badge">
        {product.badge}
      </span>
    {/if}
    {#if product.cryptoEnabled}
      <span class="crypto-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        Crypto
      </span>
    {/if}
  </a>

  <div class="card-body">
    <a href="/product/{product.id}">
      <h3 class="card-title">{product.name}</h3>
    </a>
    <p class="card-desc">{product.description.slice(0, 90)}...</p>

    <div class="card-footer">
      <div class="price">
        <span class="price-main">${product.price}</span>
        {#if product.digital}
          <span class="price-sub">Digital download</span>
        {/if}
      </div>
      <button class="btn btn-primary add-btn" onclick={addToCart}>
        {#if added}
          ✓ Added
        {:else}
          Add to Cart
        {/if}
      </button>
    </div>
  </div>
</article>

<style>
.card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  transition: border-color 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
}

.card:hover {
  border-color: #3a3a3a;
  transform: translateY(-2px);
}

.card-img-wrap {
  position: relative;
  display: block;
}

.card-img {
  height: 160px;
  background: var(--bg3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.card-img::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 60%, rgba(200, 241, 53, 0.04));
}

.card-category {
  position: absolute;
  bottom: 8px;
  left: 8px;
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text3);
}

.card-badge {
  position: absolute;
  top: 10px;
  left: 10px;
}

.crypto-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(22, 82, 240, 0.2);
  border: 1px solid rgba(22, 82, 240, 0.4);
  color: #6b9bff;
  font-family: var(--font-mono);
  font-size: 10px;
  padding: 3px 7px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
  letter-spacing: 0.05em;
}

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.3;
  transition: color 0.15s;
}

.card-title:hover { color: var(--accent); }

.card-desc {
  font-size: 13px;
  color: var(--text2);
  line-height: 1.5;
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
}

.price-main {
  font-family: var(--font-mono);
  font-size: 20px;
  font-weight: 700;
  color: var(--accent);
  display: block;
}

.price-sub {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.add-btn {
  padding: 9px 16px;
  font-size: 12px;
  white-space: nowrap;
}
</style>
