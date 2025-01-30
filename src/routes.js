import React, { useState, useContext } from "react";
import { Navigate, useRoutes } from "react-router-dom";
//Page
import Layout from "./Layout/Layout";
import Page404 from "./Pages/Page404";
import { AuthContext } from "./context/AuthContext";
import Product from "./Pages/Product/Product";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Setting from "./Pages/Setting/Setting";
import Category from "./Pages/Category/Category";
import User from "./Pages/User/User";
import Login from "./Pages/Authentication/Login/Login";

export default function Router() {
  const { setAlert, state, dispatch } = useContext(AuthContext);
  // ======================= check state user login ==========================
  const [checkToken, setCheckToken] = useState(true);
  const [token, setToken] = useState(window.localStorage.getItem("token"));


  // ========================= End check Route =============================

  const Content = useRoutes([
    { path: "/login", element: <Login /> },
    {
      path: "/",
      element: <Layout to="/dashboard" />,
      children: [
        { path: "/", element: <Navigate to="/dashboard" /> },

        { path: "/setting", element: <Setting /> },
        { path: "/setting/user", element: <User /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/setting/product", element: <Product /> },
        { path: "/setting/category", element: <Category /> },
        { path: "*", element: <Page404 /> },
      ],
    },
  ]);


  return Content;
}
