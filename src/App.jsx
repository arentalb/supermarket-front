import { Route, Routes } from "react-router";
import { BrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "./components/common/AppLayout.jsx";
import { SignUpPage } from "./pages/auth/SignUpPage.jsx";
import { LoginPage } from "./pages/auth/LoginPage.jsx";
import { ProfilePage } from "./pages/user/ProfilePage.jsx";
import { ProtectedUserRoute } from "./pages/ProtectedUserRoute.jsx";
import { ProtectedAdminRoute } from "./pages/ProtectedAdminRoute.jsx";
import { UsersPage } from "./pages/admin/UsersPage.jsx";
import { CategoryPage } from "./pages/admin/CategoryPage.jsx";
import { ProductsPage } from "./pages/admin/ProductsPage.jsx";
import { ProductList } from "./components/admin/ProductList.jsx";
import { ProductForm } from "./components/admin/ProductForm.jsx";
import { HomePage } from "./pages/user/HomePage.jsx";
import { UserProductsPage } from "./pages/user/UserProductsPage.jsx";
import { ProductDetailPage } from "./pages/user/ProductDetailPage.jsx";
import { CartPage } from "./pages/user/CartPage.jsx";
import { CheckoutPage } from "./pages/user/CheckoutPage.jsx";
import { ProtectedAuthorized } from "./pages/ProtectedAuthorized.jsx";
import { OrderListPage } from "./pages/admin/OrderListPage.jsx";
import { OrderDetailPage } from "./pages/admin/OrderDetailPage.jsx";
import { UserOrdersPage } from "./pages/user/UserOrdersPage.jsx";
import { UserOrderDetailPage } from "./pages/user/UserOrderDetailPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />

          <Route element={<ProtectedAuthorized />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/home" element={<HomePage />} />
          </Route>

          <Route element={<ProtectedUserRoute />}>
            <Route path="/products" element={<UserProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<UserOrdersPage />} />
            <Route path="/orders/:id" element={<UserOrderDetailPage />} />
          </Route>

          <Route path={"/admin"} element={<ProtectedAdminRoute />}>
            <Route path="users" element={<UsersPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="orders" element={<OrderListPage />} />
            <Route path="orders/:id" element={<OrderDetailPage />} />
            <Route path="product" element={<ProductsPage />}>
              <Route index element={<Navigate to="all" replace />} />
              <Route path="all" element={<ProductList />} />
              <Route path="new" element={<ProductForm />} />
              <Route path="edit/:id" element={<ProductForm />} />
            </Route>
          </Route>
          <Route path="*" element={<p>Not Found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
