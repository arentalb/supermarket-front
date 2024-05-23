import { useCreateUserOrderMutation } from "../../redux/api/orderApiSlice.js";
import { useState } from "react";
import { toast } from "react-toastify";
import { useGetCartQuery } from "../../redux/api/cartApiSlice.js";
import { useNavigate } from "react-router-dom";

export function CheckoutPage() {
  const {
    data: cartData,
    error: getCartError,
    isLoading: isGettingCart,
  } = useGetCartQuery();

  const [createOrderFromCart, { isLoading: isCreatingOrder }] =
    useCreateUserOrderMutation();
  const [shippingAddress, setShippingAddress] = useState("");

  const cart = cartData?.data;

  const navigate = useNavigate();
  const handleCheckout = async () => {
    try {
      await createOrderFromCart(shippingAddress).unwrap();
      toast.success("Order placed successfully");
      navigate("/home");
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  if (isGettingCart) return <LoadingSpinner />;
  if (getCartError) return <ErrorMessage message={getCartError.message} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Shipping Address
        </label>
        <input
          type="text"
          className="input input-bordered w-full "
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
        {cart.items.map((item) => (
          <div key={item.productId} className="flex justify-between mb-2">
            <div>{item.name}</div>
            <div>
              {item.quantity} x {item.price} IQD
            </div>
          </div>
        ))}
        <div className="flex justify-between font-bold">
          <div>Total</div>
          <div>
            {cart.items.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0,
            )}{" "}
            IQD
          </div>
        </div>
      </div>
      <button
        onClick={handleCheckout}
        className="btn btn-primary w-full"
        disabled={isCreatingOrder || cart.items.length < 1}
      >
        {isCreatingOrder ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="text-center text-red-500">{message}</div>
);
