import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from 'react-toastify'

import App from "./App.tsx";

import 'antd/dist/reset.css'
import './style/main.scss'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);
