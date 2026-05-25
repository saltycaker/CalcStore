<script>
  import { page } from '$app/stores';
  import { getProduct, products } from '$lib/products.js';
  import { cart } from '$lib/stores/cart.js';

  $: product = getProduct($page.params.id);
  $: related = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 3);

  let added = false;

  function addToCart() {
    if (!product) return;
    cart.addItem(product);
    added = true;
    setTimeout(() => added = false, 1800);
  }
</script>

<svelte:head>
  <title>{product?.name ?? 'Product'} — CalcMod</title>
</svelte:head>

{#if product}
<div class="product-page">
  <div class="container">

    <nav class="breadcrumb">
      <a href="/">Shop</a>
      <span>/</span>
      <a href="/?cat={product.category}">{product.category}</a>
      <span>/</span>
      <span>{product.name}</span>
    </nav>

    <div class="product-layout">
      <div class="product-media">
        <div class="product-img">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2">
            <rect x="2" y="3" width="20" height="18" rx="2"/>
            <line x1="8" y1="7" x2="16" y2="7"/>
            <line x1="8" y1="11" x2="16" y2="11"/>
            <line x1="8" y1="15" x2="12" y2="15"/>
          </svg>
          {#if product.badge}
            <span class="tag tag-{product.badge === 'new' ? 'new' : 'hot'} product-badge">{product.badge}</span>
          {/if}
        </div>

        <div class="fee-breakdown">
          <div class="fee-row">
            <span>Product price</span>
            <span>${product.price}</span>
          </div>
          <div class="fee-row">
            <span>Platform fee (5%)</span>
            <span class="fee-amount">-${product.platformFee}</span>
          </div>
          <div class="fee-divider"></div>
          <div class="fee-row total">
            <span>Seller receives</span>
            <span class="seller-amount">${product.sellerCut}</span>
          </div>
        </div>
      </div>

      <div class="product-info">
        <div class="product-meta">
          <span class="meta-cat">{product.category}</span>
          {#if product.cryptoEnabled}
            <span class="crypto-pill">⬡ Crypto accepted</span>
          {/if}
        </div>

        <h1 class="product-title">{product.name}</h1>

        <div class="product-price">
          <span class="price-num">${product.price}</span>
          <span class="price-label">USD</span>
          {#if product.digital}
            <span class="digital-label">Digital download · Instant delivery</span>
          {/if}
        </div>

        <div class="product-actions">
          <button class="btn btn-primary buy-btn" on:click={addToCart}>
            {#if added}
              ✓ Added to cart!
            {:else}
              Add to Cart
            {/if}
          </button>
          <a href="/checkout?buy={product.id}" class="btn btn-outline">Buy Now</a>
        </div>

        <div class="payment-options">
          <p class="payment-label">Pay with:</p>
          <div class="payment-icons">
            <span class="pi card">💳 Cards (Stripe)</span>
            <span class="pi">₿ BTC</span>
            <span class="pi">Ξ ETH</span>
            <span class="pi">◎ SOL</span>
            <span class="pi">$ USDC</span>
            <span class="pi">Ł LTC</span>
            <span class="pi">Ð DOGE</span>
          </div>
          <p class="payment-note">🔒 Crypto payments via Coinbase Commerce</p>
        </div>

        <div class="product-divider"></div>

        <div class="product-desc">
          <h2>About this product</h2>
          <p>{product.description}</p>
        </div>

        <div class="product-long-desc">
          {#each product.longDescription.split('\n\n') as para}
            <p>{para}</p>
          {/each}
        </div>

        <div class="product-tags">
          {#each product.tags as tag}
            <span class="ptag">{tag}</span>
          {/each}
        </div>
      </div>
    </div>

    {#if related.length > 0}
    <section class="related">
      <h2 class="related-title">Related Products</h2>
      <div class="related-grid">
        {#each related as rp}
          <a href="/product/{rp.id}" class="related-card">
            <div class="related-img">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3">
                <rect x="2" y="3" width="20" height="18" rx="2"/>
              </svg>
            </div>
            <div class="related-info">
              <span class="related-name">{rp.name}</span>
              <span class="related-price">${rp.price}</span>
            </div>
          </a>
        {/each}
      </div>
    </section>
    {/if}

  </div>
</div>
{:else}
  <div class="not-found container">
    <h1>Product not found</h1>
    <a href="/" class="btn btn-primary">Back to Shop</a>
  </div>
{/if}

<style>
.product-page { padding: 40px 0 80px; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text3);
  margin-bottom: 40px;
}

.breadcrumb a:hover { color: var(--accent); }
.breadcrumb span:last-child { color: var(--text2); }

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 60px;
  margin-bottom: 80px;
}

@media (max-width: 768px) {
  .product-layout { grid-template-columns: 1fr; gap: 32px; }
}

.product-img {
  height: 280px;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 16px;
}

.product-badge { position: absolute; top: 12px; left: 12px; }

.fee-breakdown {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 16px;
}

.fee-row {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 4px 0;
  color: var(--text2);
}

.fee-row.total { color: var(--text); font-weight: 700; }
.fee-amount { color: var(--red); }
.seller-amount { color: var(--accent); }
.fee-divider { border-top: 1px solid var(--border); margin: 8px 0; }

.product-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }

.meta-cat {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text3);
  background: var(--bg3);
  padding: 3px 8px;
  border-radius: 2px;
}

.crypto-pill {
  font-family: var(--font-mono);
  font-size: 11px;
  color: #6b9bff;
  background: rgba(22,82,240,0.1);
  border: 1px solid rgba(22,82,240,0.3);
  padding: 3px 8px;
  border-radius: 2px;
}

.product-title { font-size: 36px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 20px; }

.product-price { display: flex; align-items: baseline; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }

.price-num { font-family: var(--font-mono); font-size: 40px; font-weight: 700; color: var(--accent); }
.price-label { font-family: var(--font-mono); font-size: 14px; color: var(--text3); }
.digital-label { font-size: 12px; color: var(--text3); font-family: var(--font-mono); margin-left: 8px; }

.product-actions { display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
.buy-btn { min-width: 160px; justify-content: center; }

.payment-options {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 28px;
}

.payment-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 10px;
}

.payment-icons { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }

.pi {
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 2px;
  background: var(--bg3);
  border: 1px solid var(--border);
  color: var(--text2);
}

.pi.card { color: var(--text); }
.payment-note { font-size: 11px; color: var(--text3); font-family: var(--font-mono); }

.product-divider { border-top: 1px solid var(--border); margin: 28px 0; }

.product-desc h2 { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
.product-desc p { font-size: 15px; color: var(--text2); line-height: 1.7; margin-bottom: 16px; }

.product-long-desc p {
  font-size: 14px;
  color: var(--text2);
  line-height: 1.8;
  margin-bottom: 12px;
  font-family: var(--font-mono);
  white-space: pre-line;
}

.product-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 20px; }

.ptag {
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 3px 10px;
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 2px;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.related { border-top: 1px solid var(--border); padding-top: 48px; }
.related-title { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 24px; }

.related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }

.related-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  transition: border-color 0.15s;
}

.related-card:hover { border-color: var(--accent); }

.related-img {
  height: 100px;
  background: var(--bg3);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--border);
}

.related-info { padding: 12px 14px; display: flex; flex-direction: column; gap: 4px; }
.related-name { font-size: 13px; font-weight: 600; color: var(--text); }
.related-price { font-family: var(--font-mono); font-size: 14px; color: var(--accent); font-weight: 700; }

.not-found { padding: 120px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 24px; }
</style>
