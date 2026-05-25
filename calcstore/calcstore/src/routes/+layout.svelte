<script>
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />

<main>
  <slot />
</main>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">
          <span style="color:var(--text3)">[</span>
          CALC<span style="color:var(--accent)">MOD</span>
          <span style="color:var(--text3)">]</span>
        </div>
        <p class="footer-tagline">Custom firmware, scripts &amp; mods<br/>for serious calculator enthusiasts.</p>
      </div>

      <div>
        <h4 class="footer-heading">Shop</h4>
        <ul class="footer-links">
          <li><a href="/?cat=firmware">Firmware / OS</a></li>
          <li><a href="/?cat=scripts">Scripts</a></li>
          <li><a href="/?cat=bundle">Bundles</a></li>
          <li><a href="/?cat=cosmetic">Cosmetics</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-heading">Support</h4>
        <ul class="footer-links">
          <li><a href="/docs">Documentation</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="https://discord.gg/calcmod" target="_blank">Discord</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-heading">Payments</h4>
        <div class="payment-methods">
          <span class="pay-badge">Stripe</span>
          <span class="pay-badge crypto">BTC</span>
          <span class="pay-badge crypto">ETH</span>
          <span class="pay-badge crypto">USDC</span>
          <span class="pay-badge crypto">SOL</span>
          <span class="pay-badge crypto">LTC</span>
          <span class="pay-badge crypto">DOGE</span>
        </div>
        <p class="footer-note">5% platform fee on all sales.<br/>Sellers keep 95%.</p>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© 2025 CalcMod. All rights reserved.</span>
      <div class="footer-legal">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </div>
    </div>
  </div>
</footer>

<style>
main { min-height: calc(100vh - 64px); }

.footer {
  border-top: 1px solid var(--border);
  padding: 60px 0 30px;
  margin-top: 80px;
  background: var(--bg);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 48px;
  margin-bottom: 48px;
}

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
}

.footer-logo {
  font-family: var(--font-mono);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
}

.footer-tagline {
  font-size: 13px;
  color: var(--text2);
  line-height: 1.6;
}

.footer-heading {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text3);
  margin-bottom: 16px;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  font-size: 14px;
  color: var(--text2);
  transition: color 0.15s;
}

.footer-links a:hover { color: var(--accent); }

.payment-methods {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
}

.pay-badge {
  font-family: var(--font-mono);
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 2px;
  background: var(--bg3);
  border: 1px solid var(--border);
  color: var(--text2);
  letter-spacing: 0.04em;
}

.pay-badge.crypto {
  background: rgba(22, 82, 240, 0.1);
  border-color: rgba(22, 82, 240, 0.3);
  color: #6b9bff;
}

.footer-note {
  font-size: 12px;
  color: var(--text3);
  line-height: 1.6;
}

.footer-bottom {
  border-top: 1px solid var(--border);
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text3);
  font-family: var(--font-mono);
}

.footer-legal {
  display: flex;
  gap: 24px;
}

.footer-legal a:hover { color: var(--text); }
</style>
