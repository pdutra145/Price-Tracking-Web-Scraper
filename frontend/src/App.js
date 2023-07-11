import React from "react";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication";

const router = createBrowserRouter([
  { index: true, element: <Navbar /> },
  { path: "/auth", element: <AuthenticationPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
