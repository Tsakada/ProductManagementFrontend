import React, { useState, useContext } from "react";
import { Navigate, useNavigate, useRoutes } from "react-router-dom";
//Page
import User from "./Pages/User/User";
import Layout from "./Layout/Layout";
import Page404 from "./Pages/Page404";
import Affair from "./Pages/Product/Product";
import { AuthContext } from "./context/AuthContext";
import Login from "./Pages/Authentication/Login/Login";
import Product from "./Pages/Product/Product";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Setting from "./Pages/Setting/Setting";

export default function Router() {
  const { setAlert, state, dispatch } = useContext(AuthContext);
  // ======================= check state user login ==========================
  const [checkToken, setCheckToken] = useState(true);
  const [token, setToken] = useState(window.localStorage.getItem("token"));


  // ========================= End check Route =============================

  const Content = useRoutes([
    {
      path: "/",
      element: <Layout to="/dashboard" />,
      children: [
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "/user", element: <User /> },
        { path: "/setting", element: <Setting /> },
        { path: "/dashboard", element: <Dashboard /> },
        // { path: "/product", element: <Product /> },
        { path: "/setting/user", element: <User /> },
        { path: "/setting/category", element: <Product /> },
        { path: "/setting/product", element: <Product /> },
        { path: "/setting/affair", element: <Affair /> },
        { path: "*", element: <Page404 /> },
      ],
    },
  ]);


  return Content;
}
