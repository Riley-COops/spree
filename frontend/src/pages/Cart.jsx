import { useCartStore } from "../utils/cartUtils";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const calculateTotalPrice = useCartStore((state) => state.calculateTotalPrice);


  const handleCheckout = () => {
    const isAuthenticated = localStorage.getItem("accessToken");
    if(!isAuthenticated) {
      navigate("/login", { state: { from: "/cart" } });
    } else{
      navigate("/checkout")
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center mt-10 text-lg">Your cart is empty.</div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <img
                src={item.image || 'https://via.placeholder.com/150'}
                alt={item.name}
                className="w-24 h-24 object-contain"
              />
              <div className="flex flex-col flex-grow mx-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right mt-4">
            <h2 className="text-xl font-semibold">
              Total: ${calculateTotalPrice().toFixed(2)}
            </h2>
          </div>
          <button disabled={cartItems.length === 0}
            onClick={handleCheckout}
            className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition mt-4"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;