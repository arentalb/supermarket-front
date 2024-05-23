import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useGetProductByIdQuery } from "../../redux/api/productApiSlice.js";
import {
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartItemMutation,
} from "../../redux/api/cartApiSlice.js";

export function ProductDetailPage() {
  const { id } = useParams();
  const {
    data: productData,
    error,
    isError,
    isLoading,
  } = useGetProductByIdQuery(id);
  const product = productData?.data;

  const {
    data: cartItems,
    error: getCartError,
    isLoading: isGettingCart,
  } = useGetCartQuery();
  const [addToCart, { error: addToCartError }] = useAddToCartMutation();
  const [updateCartItem, { error: updateCartError }] =
    useUpdateCartItemMutation();

  const [isProductAdded, setIsProductAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (cartItems?.data?.items) {
      const existingProduct = cartItems.data.items.find(
        (item) => item.productId === id,
      );
      if (existingProduct) {
        setQuantity(existingProduct.quantity);
        setIsProductAdded(true);
      } else {
        setIsProductAdded(false);
      }
    }
  }, [cartItems, id]);

  const handleAddToCart = async (product) => {
    try {
      await addToCart({ productId: product._id, quantity: 1 }).unwrap();
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      toast.error(
        addToCartError?.data?.message ||
          addToCartError.message ||
          "Failed to add to cart",
      );
    }
  };

  const handleUpdateCartItem = async (productId, quantity) => {
    try {
      await updateCartItem({ productId, quantity }).unwrap();
      toast.success("Cart updated");
    } catch (err) {
      toast.error(`Failed to update cart: ${updateCartError.message}`);
    }
  };

  if (isError) {
    toast.error(`Error loading product details: ${error.message}`);
    return (
      <div className="text-center text-red-500">
        Error loading product details: {error.message}
      </div>
    );
  }

  if (addToCartError) {
    return (
      <div className="text-center text-red-500">
        Error: {addToCartError.message}
      </div>
    );
  }

  if (updateCartError) {
    return (
      <div className="text-center text-red-500">
        Error: {updateCartError.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-col gap-8 md:flex-row">
          <LeftColumn product={product} />
          <RightColumn
            product={product}
            isProductAdded={isProductAdded}
            quantity={quantity}
            handleAddToCart={handleAddToCart}
            handleUpdateCartItem={handleUpdateCartItem}
          />
        </div>
      )}
    </div>
  );
}

function LeftColumn({ product }) {
  return (
    <div className="w-full md:w-1/2">
      <img
        src={product.image}
        alt={product.name}
        className="w-full rounded-lg shadow-md"
      />
      <div className="mt-4 md:block hidden">
        <p className="text-lg text-gray-600">
          <strong>Description:</strong> {product.description}
        </p>
      </div>
    </div>
  );
}

function RightColumn({
  product,
  isProductAdded,
  quantity,
  handleAddToCart,
  handleUpdateCartItem,
}) {
  return (
    <div className="w-full md:w-1/2 flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
      <p className="text-lg text-gray-600">
        <strong>Brand:</strong> {product.brand}
      </p>
      <p className="text-lg text-gray-600">
        <strong>Category:</strong> {product.category.name}
      </p>
      <p className="text-lg text-gray-600">
        <strong>Price:</strong> {product.price} IQD
      </p>
      <div className="md:hidden block">
        <p className="text-lg text-gray-600">
          <strong>Description:</strong> {product.description}
        </p>
      </div>
      <div className="mt-20">
        {isProductAdded ? (
          <div className="flex gap-4 items-center">
            <button
              onClick={() => handleUpdateCartItem(product._id, quantity - 1)}
              className="btn btn-square btn-primary"
            >
              <FiMinus />
            </button>
            <p className="text-lg">{quantity}</p>
            <button
              onClick={() => handleUpdateCartItem(product._id, quantity + 1)}
              className="btn btn-square btn-primary"
            >
              <FiPlus />
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleAddToCart(product)}
            className="btn btn-primary w-32"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
