import { useGetUserOrderDetailQuery } from "../../redux/api/orderApiSlice.js";
import { useParams } from "react-router-dom";

export function UserOrderDetailPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetUserOrderDetailQuery(id);

  const order = data?.data;

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <h2 className="text-2xl font-semibold mb-2">Order ID: {order._id}</h2>

      <div className="overflow-x-auto mb-6">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Shipping Address</th>
              <th>Payment Method</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr key={order._id}>
              <th>1</th>
              <td>{order.shippingAddress}</td>
              <td>{order.paymentMethod}</td>
              <td>{order.isPaid ? "Yes" : "No"}</td>
              <td>{order.isDelivered ? "Yes" : "No"}</td>
              <td>{order.totalPrice} IQD</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={item.productId._id}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price} IQD</td>
                <td>{item.price * item.quantity} IQD</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
