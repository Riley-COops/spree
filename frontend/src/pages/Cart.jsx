import React, { useEffect, useState } from 'react';
import { fetchCart } from '../endpoints/Services';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await fetchCart();
        console.log('Fetched cart data:', data); // Log the fetched data
        setCartItems(data);
      } catch (err) {
        setError('Failed to load cart items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = item.product || {};
      const price = product.price || 0;
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading cart...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (cartItems.length === 0) {
    return <div className="text-center mt-10 text-gray-500">Your cart is empty.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-8">Your Cart</h1>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2">Product</th>
              <th className="border-b py-2">Price</th>
              <th className="border-b py-2">Quantity</th>
              <th className="border-b py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              const product = item.product || {}; // Fallback to an empty object if product is undefined
              const image = product.image || '/placeholder.png';
              const name = product.name || 'Unknown Product';
              const price = typeof product.price === 'number' ? product.price : 0; // Ensure price is a number
              const quantity = item.quantity;

              return (
                <tr key={item.id}>
                  <td className="py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={image}
                        alt={name}
                        className="w-16 h-16 object-contain bg-gray-100"
                      />
                      <span>{name}</span>
                    </div>
                  </td>
                  <td className="py-4">${price.toFixed(2)}</td>
                  <td className="py-4">{quantity}</td>
                  <td className="py-4">${(price * quantity).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-6 text-right">
          <h2 className="text-xl font-bold">Total: ${calculateTotal()}</h2>
          <button className="mt-4 bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
