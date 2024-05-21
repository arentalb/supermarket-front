import { FiCheck, FiX } from "react-icons/fi";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice.js";
import { toast } from "react-toastify";

export function UserList() {
  const { data, isLoading, error, isError } = useGetUsersQuery();
  const users = data ? data.data : [];
  if (isError) {
    toast.error(
      error?.data?.message || error.message || "Error fetching users",
    );
  }

  return (
    <>
      {isLoading ? (
        <div className={"w-full flex justify-center items-center"}>
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th>IS ADMIN</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? <FiCheck /> : <FiX />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
