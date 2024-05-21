import { Link, useNavigate } from "react-router-dom";
import {
  FiBook,
  FiBox,
  FiHeart,
  FiHome,
  FiLogOut,
  FiPackage,
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, logOut } from "../../redux/feature/auth/authSlice.js";
import { useLogoutMutation } from "../../redux/api/usersApiSlice.js";
import { toast } from "react-toastify";

export function Header() {
  const userInfo = useSelector(getUserInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(logOut());
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Practice</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {!userInfo ? (
            <>
              <li>
                <Link to={"login"}>Login</Link>
              </li>
              <li>
                <Link to={"signup"}>Signup</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <details>
                  <summary>{userInfo.isAdmin ? "Admin" : "Menu"}</summary>
                  <ul className="p-2 bg-base-100 rounded-t-none">
                    {!userInfo.isAdmin ? (
                      <>
                        <li>
                          <Link to={"home"}>
                            <FiHome />
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link to={"shop"}>
                            <FiShoppingBag />
                            Shop
                          </Link>
                        </li>
                        <li>
                          <Link to={"cart"}>
                            <FiShoppingCart />
                            Cart
                          </Link>
                        </li>
                        <li>
                          <Link to={"favorite"}>
                            <FiHeart />
                            Favorite
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to={"admin/dashboard"}>
                            <FiHome />
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link to={"admin/product"}>
                            <FiBox />
                            Products
                          </Link>
                        </li>
                        <li>
                          <Link to={"admin/category"}>
                            <FiBook />
                            Category
                          </Link>
                        </li>
                        <li>
                          <Link to={"admin/orderList"}>
                            <FiPackage />
                            Orders
                          </Link>
                        </li>
                        <li>
                          <Link to={"admin/users"}>
                            <FiUsers />
                            Users
                          </Link>
                        </li>
                      </>
                    )}
                    <li>
                      <Link to={"profile"} className={"border-t-2"}>
                        <FiUser />
                        <span>{userInfo.username}</span>
                      </Link>
                    </li>
                    <li>
                      <button onClick={logoutHandler}>
                        <FiLogOut />
                        <span>logout</span>
                      </button>
                    </li>
                  </ul>
                </details>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
