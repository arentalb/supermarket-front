import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { AppLayout } from "./components/AppLayout.jsx";
import { SignUpPage } from "./pages/auth/SignUpPage.jsx";
import { LoginPage } from "./pages/auth/LoginPage.jsx";
import { ProfilePage } from "./pages/user/ProfilePage.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { AdminRoute } from "./pages/admin/AdminRoute.jsx";
import { UsersPage } from "./pages/admin/UsersPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<p>homepage</p>} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path={"/admin"} element={<AdminRoute />}>
            <Route path="users" element={<UsersPage />} />
          </Route>
          <Route path="*" element={<p>Not Found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
