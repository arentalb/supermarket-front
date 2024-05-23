import { toast } from "react-toastify";
import {
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/api/checkoutApiSlice.js";
import { useParams } from "react-router-dom";

export function OrderDetailPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetOrderByIdQuery(id);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const order = data?.data;

  const handleStatusUpdate = async (statusUpdate) => {
    try {
      await updateOrderStatus({ id, updateData: statusUpdate }).unwrap();
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Order ID: {order._id}</h2>
        <div className="overflow-x-auto mb-6">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>User</th>
                <th>Total</th>
                <th>Shipping Address</th>
                <th>Payment Method</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              <tr key={order._id}>
                <th>1</th>
                <td>{order.userId.email}</td>
                <td>{order.totalPrice}</td>
                <td>{order.shippingAddress}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.isPaid ? "Yes" : "No"}</td>
                <td>{order.isDelivered ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
                <td>${item.price}</td>
                <td>${item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex space-x-4">
        {!order.isPaid && (
          <button
            onClick={() => handleStatusUpdate({ isPaid: true })}
            className="btn btn-success"
          >
            Mark as Paid
          </button>
        )}
        {!order.isDelivered && (
          <button
            onClick={() => handleStatusUpdate({ isDelivered: true })}
            className="btn btn-success"
          >
            Mark as Delivered
          </button>
        )}
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
