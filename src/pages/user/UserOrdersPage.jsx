import { Link } from "react-router-dom";
import { useGetUserOrdersQuery } from "../../redux/api/orderApiSlice.js";

export function UserOrdersPage() {
  const { data, error, isLoading } = useGetUserOrdersQuery();
  const orders = data?.data;
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.totalPrice} IQD</td>
                <td>{order.isPaid ? "Yes" : "No"}</td>
                <td>{order.isDelivered ? "Yes" : "No"}</td>
                <td>
                  <Link to={`/orders/${order._id}`} className="btn btn-primary">
                    Details
                  </Link>
                </td>
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
