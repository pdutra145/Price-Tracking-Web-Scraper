import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/Protected";
import AuthProvider from "./context/Auth";
import LoadingProvider from "./context/Loading";
import ProductPage from "./pages/Product";

const router = createBrowserRouter([
  { index: true, path: "/auth", element: <AuthenticationPage /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/products/:id",
    element: (<ProtectedRoute><ProductPage /></ProtectedRoute>)
  }
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
