import { Link } from "react-router-dom";
import { FiHeart, FiHome, FiShoppingBag, FiShoppingCart } from "react-icons/fi";

export function Navigation() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Practice</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"login"}>Login</Link>
          </li>
          <li>
            <Link to={"signup"}>Signup</Link>
          </li>

          <li>
            <details>
              <summary>Menu</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
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
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
