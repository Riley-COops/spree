import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (product) => {
    const itemExists = get().cartItems.find((item) => item.id === product.id);
    if (itemExists) {
      set({
        cartItems: get().cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        cartItems: [...get().cartItems, { ...product, quantity: 1 }],
      });
    }
  },

  removeFromCart: (productId) => {
    set({
      cartItems: get().cartItems.filter((item) => item.id !== productId),
    });
  },

  updateQuantity: (productId, quantity) => {
    set({
      cartItems: get().cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    });
  },

  calculateTotalPrice: () => {
    return get().cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));
