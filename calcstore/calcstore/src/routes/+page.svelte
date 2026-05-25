<script>
  import { products, categories } from '$lib/products.js';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { page } from '$app/stores';

  let selectedCategory = 'all';

  $: filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);
</script>

<svelte:head>
  <title>CalcMod — Calculator Mods, Scripts & Custom Firmware</title>
</svelte:head>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg">
    <div class="grid-lines"></div>
  </div>
  <div class="container">
    <div class="hero-content">
      <div class="hero-eyebrow">
        <span class="tag tag-new">Digital Downloads</span>
        <span class="hero-sep">—</span>
        <span class="hero-sub-tag">Crypto &amp; Card Accepted</span>
      </div>
      <h1 class="hero-title">
        Unlock Your<br/>
        <span class="hero-accent">Calculator's</span><br/>
        Full Potential
      </h1>
      <p class="hero-desc">
        Custom firmware, Python toolkits, script libraries, and mods
        for TI, Casio, HP, and more. Built by enthusiasts, for enthusiasts.
      </p>
      <div class="hero-actions">
        <a href="#products" class="btn btn-primary">Browse Products</a>
        <a href="/docs" class="btn btn-outline">Documentation</a>
      </div>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-num">6</span>
          <span class="stat-label">Products</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-num">8</span>
          <span class="stat-label">Crypto Currencies</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-num">95%</span>
          <span class="stat-label">Seller Payout</span>
        </div>
      </div>
    </div>

    <div class="hero-visual">
      <div class="calc-mockup">
        <div class="calc-screen">
          <div class="screen-line blink">$ ./install_custom_os.sh</div>
          <div class="screen-line">Detecting calculator model... TI-84 CE</div>
          <div class="screen-line">Backing up original firmware... OK</div>
          <div class="screen-line accent">Installing CalcMod OS v3.1...</div>
          <div class="screen-line">████████████████ 100%</div>
          <div class="screen-line success">✓ Installation complete!</div>
          <div class="screen-line">Rebooting device...</div>
          <div class="screen-cursor">▊</div>
        </div>
        <div class="calc-keys">
          {#each Array(20) as _}
            <div class="calc-key"></div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- TRUSTED PAYMENT BANNER -->
<div class="payment-bar">
  <div class="container">
    <span class="pay-label">Accepted payments:</span>
    <div class="pay-list">
      <span class="pay-item card">💳 Visa / MC / Amex</span>
      <span class="pay-item crypto">₿ Bitcoin</span>
      <span class="pay-item crypto">Ξ Ethereum</span>
      <span class="pay-item crypto">◎ Solana</span>
      <span class="pay-item crypto">$ USDC</span>
      <span class="pay-item crypto">Ł Litecoin</span>
      <span class="pay-item crypto">Ð Dogecoin</span>
    </div>
    <span class="pay-secure">🔒 Secured by Stripe &amp; Coinbase Commerce</span>
  </div>
</div>

<!-- PRODUCTS -->
<section class="products-section" id="products">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Products</h2>
      <div class="cat-filter">
        {#each categories as cat}
          <button
            class="cat-btn"
            class:active={selectedCategory === cat.id}
            onclick={() => selectedCategory = cat.id}
          >
            {cat.label}
          </button>
        {/each}
      </div>
    </div>

    <div class="products-grid">
      {#each filteredProducts as product (product.id)}
        <div class="animate-in">
          <ProductCard {product} />
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- FEATURES -->
<section class="features-section">
  <div class="container">
    <h2 class="section-title">Why CalcMod?</h2>
    <div class="features-grid">
      <div class="feature">
        <div class="feature-icon">⚡</div>
        <h3>Instant Download</h3>
        <p>All products are digital. Get your files immediately after payment confirmation — no waiting.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">🔐</div>
        <h3>Crypto-First</h3>
        <p>Pay with Bitcoin, Ethereum, USDC, Solana, Litecoin, or Dogecoin via Coinbase Commerce. Private and secure.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">♻️</div>
        <h3>Lifetime Updates</h3>
        <p>Buy once, get all future updates free. Our products are actively maintained and improved.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">💬</div>
        <h3>Community Support</h3>
        <p>Every purchase includes access to our Discord with 2,000+ calculator modders. Never get stuck.</p>
      </div>
    </div>
  </div>
</section>

<style>
/* HERO */
.hero {
  position: relative;
  overflow: hidden;
  padding: 80px 0 60px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(200,241,53,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200,241,53,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 60px;
}

.hero-content { flex: 1; }

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.hero-sep { color: var(--text3); }

.hero-sub-tag {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.hero-title {
  font-size: clamp(36px, 5vw, 60px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
}

.hero-accent {
  color: var(--accent);
  font-style: italic;
}

.hero-desc {
  font-size: 16px;
  color: var(--text2);
  line-height: 1.6;
  max-width: 440px;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 24px;
}

.stat { text-align: center; }

.stat-num {
  display: block;
  font-family: var(--font-mono);
  font-size: 24px;
  font-weight: 700;
  color: var(--accent);
}

.stat-label {
  font-size: 11px;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: var(--font-mono);
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--border);
}

/* CALC MOCKUP */
.hero-visual {
  flex: 0 0 360px;
  display: flex;
  justify-content: center;
}

.calc-mockup {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 0 60px rgba(200, 241, 53, 0.05);
}

.calc-screen {
  background: #0d1117;
  border: 1px solid #2a2a2a;
  border-radius: 4px;
  padding: 16px;
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.8;
  color: #7ec8a0;
  margin-bottom: 16px;
  min-height: 180px;
}

.screen-line { display: block; }
.screen-line.accent { color: var(--accent); }
.screen-line.success { color: #5af78e; }

.screen-cursor {
  display: inline-block;
  color: var(--accent);
  animation: blink 1s step-end infinite;
}

@keyframes blink { 50% { opacity: 0; } }

.calc-keys {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
}

.calc-key {
  height: 20px;
  background: var(--bg3);
  border-radius: 3px;
  border: 1px solid var(--border);
}

/* PAYMENT BAR */
.payment-bar {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 14px 0;
  background: var(--bg2);
  overflow: hidden;
}

.payment-bar .container {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.pay-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.pay-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex: 1;
}

.pay-item {
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 2px;
  border: 1px solid var(--border);
  white-space: nowrap;
}

.pay-item.card { color: var(--text2); }
.pay-item.crypto { color: #6b9bff; border-color: rgba(22,82,240,0.3); background: rgba(22,82,240,0.08); }

.pay-secure {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text3);
  white-space: nowrap;
}

/* PRODUCTS SECTION */
.products-section {
  padding: 60px 0;
}

.products-section .container,
.features-section .container {
  display: block;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  gap: 16px;
  flex-wrap: wrap;
}

.section-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.cat-filter {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.cat-btn {
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 6px 14px;
  border-radius: var(--radius);
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text2);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  transition: all 0.15s;
}

.cat-btn:hover, .cat-btn.active {
  background: var(--bg3);
  border-color: var(--accent);
  color: var(--accent);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* FEATURES */
.features-section {
  padding: 60px 0 80px;
  border-top: 1px solid var(--border);
}

.features-section .section-title {
  margin-bottom: 40px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.feature {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 28px;
  transition: border-color 0.2s;
}

.feature:hover { border-color: #3a3a3a; }

.feature-icon {
  font-size: 28px;
  margin-bottom: 14px;
}

.feature h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
}

.feature p {
  font-size: 14px;
  color: var(--text2);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero .container { flex-direction: column; }
  .hero-visual { display: none; }
}
</style>
