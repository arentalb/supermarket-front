import { Link } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../redux/api/checkoutApiSlice.js";

export function OrderListPage() {
  const { data, error, isLoading } = useGetAllOrdersQuery();

  const orders = data?.data;
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Order ID</th>
              <th>User</th>
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
                <td>{order.userId.email}</td>
                <td>${order.totalPrice}</td>
                <td>{order.isPaid ? "Yes" : "No"}</td>
                <td>{order.isDelivered ? "Yes" : "No"}</td>
                <td>
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="btn btn-primary"
                  >
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
