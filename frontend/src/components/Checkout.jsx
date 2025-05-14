import React, { useEffect, useState } from "react";
import { useCartStore } from "../utils/cartUtils";
import { createDelivery, createOrder, fetchDeliveryDetails } from "../endpoints/Services";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const cartItems = useCartStore((state) => state.cartItems);
  const calculateTotalPrice = useCartStore((state) => state.calculateTotalPrice);

  const [address, setAddress] = useState("");
  const [land_mark, setLandmark] = useState("");
  const [telephone, setTelephone] = useState("");

  const [useSavedInfo, setUseSavedInfo] = useState(false);

  useEffect(() => {
    async function getDeliveryDetails() {
      try {
        const details = await fetchDeliveryDetails();
        setDeliveryDetails(details);

        // Preload the first saved delivery info when checkbox is used
        if (details && details.length > 0 && useSavedInfo) {
          const saved = details[0];
          setAddress(saved.address);
          setLandmark(saved.land_mark);
          setTelephone(saved.telephone);
        }
      } catch (error) {
        console.error("Error fetching delivery details:", error);
      }
    }

    getDeliveryDetails();
  }, [useSavedInfo]);

  const handleUseSavedInfoChange = (e) => {
    const isChecked = e.target.checked;
    setUseSavedInfo(isChecked);

    if (isChecked && deliveryDetails && deliveryDetails.length > 0) {
      const saved = deliveryDetails[0];
      setAddress(saved.address);
      setLandmark(saved.land_mark);
      setTelephone(saved.telephone);
    }
  };

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    try {
      // Step 1: Create delivery info
      const deliveryResponse = await createDelivery({ address, land_mark, telephone });
      const deliveryId = deliveryResponse.id;

      // Step 2: Prepare order items
      const orderItems = cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      // Step 3: Create order
      await createOrder({
        delivery_id: deliveryId,
        total_price: calculateTotalPrice(),
        items: orderItems
      });

      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      alert("Order failed: " + error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded">
      {
        Array.isArray(deliveryDetails) && deliveryDetails.length > 0 ? (
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-4">Saved Delivery Details</h2>
            {deliveryDetails.map((detail) => (
              <div key={detail.id} className="border-b py-2">
                <p><strong>Address:</strong> {detail.address}</p>
                <p><strong>Landmark:</strong> {detail.land_mark}</p>
                <p><strong>Telephone:</strong> {detail.telephone}</p>
              </div>
            ))}
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={useSavedInfo}
                onChange={handleUseSavedInfoChange}
                className="mr-2"
              />
              Use saved delivery info
            </label>
          </div>
        ) : (
          <p>Loading delivery details...</p>
        )
      }

      <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        disabled={useSavedInfo}
      />
      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Landmark"
        value={land_mark}
        onChange={(e) => setLandmark(e.target.value)}
        disabled={useSavedInfo}
      />
      <input
        className="w-full p-2 border rounded mb-4"
        placeholder="Telephone"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        disabled={useSavedInfo}
      />

      <button
        onClick={handlePlaceOrder}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
