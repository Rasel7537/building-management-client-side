
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";

// ✅ Added for react-toastify
import { ToastContainer } from "react-toastify"; // ➕ ToastContainer import
import "react-toastify/dist/ReactToastify.css"; // ➕ Toastify CSS import

function App() {
  return (
    <>
      <RouterProvider router={router} />

      {/* ✅ ToastContainer added for showing toast messages globally */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
