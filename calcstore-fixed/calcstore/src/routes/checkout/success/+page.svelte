<script>
  import { page } from '$app/stores';
  import { cart } from '$lib/stores/cart.js';
  import { onMount } from 'svelte';

  let method = $page.url.searchParams.get('method') || 'card';

  onMount(() => {
    cart.clear();
  });
</script>

<svelte:head>
  <title>Order Confirmed — CalcMod</title>
</svelte:head>

<div class="success-page">
  <div class="container">
    <div class="success-card">
      <div class="success-icon">
        {#if method === 'crypto'}
          <div class="icon-circle crypto">⛓</div>
        {:else}
          <div class="icon-circle card">✓</div>
        {/if}
      </div>

      <h1>Order Confirmed!</h1>

      {#if method === 'crypto'}
        <p class="success-msg">
          Your crypto payment has been received. Once confirmed on-chain,
          you'll get an email with your download link.
          <strong>This usually takes 1–10 minutes.</strong>
        </p>
        <div class="info-box crypto-info">
          <div class="info-row">
            <span>Payment method</span>
            <span>Coinbase Commerce (Crypto)</span>
          </div>
          <div class="info-row">
            <span>Status</span>
            <span class="pending">Awaiting confirmation</span>
          </div>
        </div>
      {:else}
        <p class="success-msg">
          Payment successful! Your download link has been sent to your email.
          Check your inbox (and spam folder just in case).
        </p>
        <div class="info-box">
          <div class="info-row">
            <span>Payment method</span>
            <span>Stripe (Card)</span>
          </div>
          <div class="info-row">
            <span>Status</span>
            <span class="confirmed">Confirmed</span>
          </div>
        </div>
      {/if}

      <div class="next-steps">
        <h2>What's next?</h2>
        <ol>
          <li>Check your email for the download link</li>
          <li>Join our <a href="https://discord.gg/calcmod">Discord</a> for setup help</li>
          <li>Read the <a href="/docs">documentation</a> to get started</li>
        </ol>
      </div>

      <div class="success-actions">
        <a href="/" class="btn btn-primary">Back to Shop</a>
        <a href="/docs" class="btn btn-outline">Read Docs</a>
      </div>
    </div>
  </div>
</div>

<style>
.success-page {
  padding: 80px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px);
}

.container {
  max-width: 560px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

.success-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 48px;
  text-align: center;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.success-icon { margin-bottom: 24px; }

.icon-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.icon-circle.card { background: rgba(200,241,53,0.1); border: 2px solid var(--accent); color: var(--accent); }
.icon-circle.crypto { background: rgba(22,82,240,0.1); border: 2px solid #1652f0; color: #6b9bff; }

h1 { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 16px; }

.success-msg { font-size: 15px; color: var(--text2); line-height: 1.7; margin-bottom: 24px; }

.info-box {
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 28px;
  text-align: left;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 4px 0;
  color: var(--text2);
}

.confirmed { color: var(--accent); font-weight: 700; }
.pending { color: var(--accent2); font-weight: 700; }

.next-steps { text-align: left; margin-bottom: 32px; }
.next-steps h2 { font-size: 16px; font-weight: 700; margin-bottom: 12px; }

.next-steps ol {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.next-steps li { font-size: 14px; color: var(--text2); line-height: 1.5; }
.next-steps a { color: var(--accent); text-decoration: underline; }

.success-actions { display: flex; gap: 12px; justify-content: center; }
</style>
