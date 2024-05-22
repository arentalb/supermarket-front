import { toast } from "react-toastify";
import {
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "../../redux/api/cartApiSlice.js";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

export function CartPage() {
  const {
    data,
    error: getCartError,
    isLoading: isGettingCart,
  } = useGetCartQuery();

  const [updateCartItem, { error: updateCartError }] =
    useUpdateCartItemMutation();
  const [removeCartItem, { error: removeCartError }] =
    useRemoveCartItemMutation();

  const cart = data?.data;

  const handleUpdateCartItem = async (productId, quantity) => {
    try {
      await updateCartItem({ productId, quantity }).unwrap();
      toast.success("Cart updated");
    } catch (err) {
      toast.error(`Failed to update cart: ${err.message}`);
    }
  };

  const handleRemoveCartItem = async (productId) => {
    try {
      await removeCartItem(productId).unwrap();
      toast.success("Item removed from cart");
    } catch (err) {
      toast.error(`Failed to remove item: ${err.message}`);
    }
  };

  if (isGettingCart) return <LoadingSpinner />;
  if (getCartError) return <ErrorMessage message={getCartError.message} />;
  if (updateCartError)
    return <ErrorMessage message={updateCartError.message} />;
  if (removeCartError)
    return <ErrorMessage message={removeCartError.message} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart?.items?.length > 0 ? (
        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
          <div className={"col-span-2"}>
            <CartItems
              items={cart.items}
              handleUpdateCartItem={handleUpdateCartItem}
              handleRemoveCartItem={handleRemoveCartItem}
            />
          </div>
          <div className={"col-span-1"}>
            <Link className={"btn btn-primary w-full"} to={"/checkout"}>
              checkout
            </Link>
          </div>
        </div>
      ) : (
        <EmptyCartMessage />
      )}
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

const EmptyCartMessage = () => (
  <p className="text-center text-gray-500">Your cart is empty.</p>
);

function CartItems({ items, handleUpdateCartItem, handleRemoveCartItem }) {
  return (
    <div className="space-y-4 ">
      {items?.map((item) => (
        <CartItem
          key={item.productId}
          item={item}
          handleUpdateCartItem={handleUpdateCartItem}
          handleRemoveCartItem={handleRemoveCartItem}
        />
      ))}
    </div>
  );
}

function CartItem({ item, handleUpdateCartItem, handleRemoveCartItem }) {
  return (
    <div className="flex justify-between sm:items-center items-start flex-col sm:flex-row p-4 border  rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div>
          <p className="font-semibold">{item.name}</p>
          <p className="text-gray-500">Quantity: {item.quantity}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() =>
            handleUpdateCartItem(item.productId, item.quantity - 1)
          }
          className="btn btn-square btn-primary"
        >
          <FiMinus />
        </button>
        <button
          onClick={() =>
            handleUpdateCartItem(item.productId, item.quantity + 1)
          }
          className="btn btn-square btn-primary"
        >
          <FiPlus />
        </button>

        <button
          onClick={() => handleRemoveCartItem(item.productId)}
          className="btn  btn-error"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
