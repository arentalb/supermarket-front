import { UserList } from "../../components/admin/UserList.jsx";

export function UsersPage() {
  return (
    <div className={" py-10 "}>
      <h1 className={"text-3xl font-bold mb-8"}>All users </h1>
      <UserList />
    </div>
  );
}
