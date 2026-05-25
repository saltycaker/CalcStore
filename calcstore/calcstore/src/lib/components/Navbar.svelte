<script>
  import { cartCount } from '$lib/stores/cart.js';
  import { page } from '$app/stores';

  let menuOpen = false;

  const nav = [
    { href: '/', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/docs', label: 'Docs' },
  ];
</script>

<header class="header">
  <div class="container">
    <a href="/" class="logo">
      <span class="logo-bracket">[</span>
      CALC<span class="logo-accent">MOD</span>
      <span class="logo-bracket">]</span>
    </a>

    <nav class="nav">
      {#each nav as link}
        <a
          href={link.href}
          class="nav-link"
          class:active={$page.url.pathname === link.href}
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <div class="header-right">
      <a href="/cart" class="cart-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        {#if $cartCount > 0}
          <span class="cart-count">{$cartCount}</span>
        {/if}
      </a>
    </div>
  </div>
</header>

<style>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 10, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.logo-bracket { color: var(--text3); }
.logo-accent { color: var(--accent); }

.nav {
  display: flex;
  gap: 4px;
  flex: 1;
}

.nav-link {
  font-family: var(--font-mono);
  font-size: 13px;
  padding: 6px 14px;
  border-radius: var(--radius);
  color: var(--text2);
  transition: color 0.15s, background 0.15s;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.nav-link:hover, .nav-link.active {
  color: var(--text);
  background: var(--bg3);
}

.nav-link.active { color: var(--accent); }

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}

.cart-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: var(--radius);
  background: var(--bg3);
  border: 1px solid var(--border);
  color: var(--text);
  transition: border-color 0.15s, color 0.15s;
}

.cart-btn:hover { border-color: var(--accent); color: var(--accent); }

.cart-count {
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--accent);
  color: #0a0a0a;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
