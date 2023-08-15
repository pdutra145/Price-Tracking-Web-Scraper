import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication";
import Dashboard, { loader as dashboardLoader } from "./pages/Dashboard";
import ProtectedRoute from "./components/Protected";
import AuthProvider from "./context/Auth";
import LoadingProvider from "./context/Loading";
import ProductPage, { loader as prodLoader } from "./pages/Product";
import SettingsPage from "./pages/Settings";
import ProfilePage from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
        loader: prodLoader,
      },
      { path: "settings", element: <SettingsPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  { index: true, path: "/auth", element: <AuthenticationPage /> },
]);

const App = () => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LoadingProvider>
  );
};

export default App;
