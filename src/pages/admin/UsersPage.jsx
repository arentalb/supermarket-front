import { useGetUsersQuery } from "../../redux/api/usersApiSlice.js";
import { FiCheck, FiX } from "react-icons/fi";

export function UsersPage() {
  const { data, isLoading, error } = useGetUsersQuery();
  const users = data ? data.data : [];

  return (
    <div className={" py-10 "}>
      <h1 className={"text-3xl font-bold mb-8"}>All users </h1>
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
    </div>
  );
}
