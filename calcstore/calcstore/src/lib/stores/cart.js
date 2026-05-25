// src/lib/stores/cart.js
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

const CART_KEY = 'calcstore_cart';

function createCart() {
  const initial = browser
    ? JSON.parse(localStorage.getItem(CART_KEY) || '[]')
    : [];

  const { subscribe, set, update } = writable(initial);

  if (browser) {
    subscribe(items => {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    });
  }

  return {
    subscribe,

    addItem(product) {
      update(items => {
        const existing = items.find(i => i.id === product.id);
        if (existing) {
          return items.map(i =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return [...items, { ...product, qty: 1 }];
      });
    },

    removeItem(id) {
      update(items => items.filter(i => i.id !== id));
    },

    updateQty(id, qty) {
      if (qty <= 0) {
        update(items => items.filter(i => i.id !== id));
        return;
      }
      update(items =>
        items.map(i => (i.id === id ? { ...i, qty } : i))
      );
    },

    clear() {
      set([]);
    }
  };
}

export const cart = createCart();

export const cartTotal = derived(cart, $cart =>
  $cart.reduce((sum, item) => sum + item.price * item.qty, 0)
);

export const cartCount = derived(cart, $cart =>
  $cart.reduce((sum, item) => sum + item.qty, 0)
);

export const platformFee = derived(cartTotal, $total =>
  +($total * 0.05).toFixed(2)
);

export const sellerPayout = derived(cartTotal, $total =>
  +($total * 0.95).toFixed(2)
);
