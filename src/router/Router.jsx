// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import AuthLayouts from "../layouts/AuthLayouts";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Authentication/login/Login";
import Register from "../pages/Authentication/Register/Register";
import Apartments from "../pages/apartments/Apartments";
import AddApartment from "../pages/apartments/AddApartment";

// Private Routes
import PrivateRoutes from "../routes/privateRoutes";
import MyApartment from "../pages/Dashbord/MyApartment/MyApartment";
import Payment from "../pages/Dashbord/Payment/Payment";
import PaymentHistory from "../pages/Dashbord/PaymentHistory/PaymentHistory";
import MembersProfile from "../pages/Dashbord/MembersProfile/MembersProfile";
import AnnouncementsToAll from "../pages/Dashbord/AnnouncementsToAll/AnnouncementsToAll";
import BeAUser from "../pages/Dashbord/BeAUser/BeAuser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "apartments",
        element: <Apartments />,
      },
      {
        path: "addApartment",
        element: (
          <PrivateRoutes>
            <AddApartment />
          </PrivateRoutes>
        ),
      },
      // // যদি AddCoupon.jsx থাকে তাহলে uncomment করুন
      // {
      //   path: "addCoupon",
      //   element: (
      //     <PrivateRoutes>
      //       <AddCoupon />
      //     </PrivateRoutes>
      //   ),
      // },
      {
        path: "beAUser",
        Component: BeAUser,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayouts />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  // ✅ Dashboard with Role Based Redirect
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      //member's part
      {
        path: "membersProfile",
        Component: MembersProfile,
      },
      {
        path: "myApartment",
        Component: MyApartment,
      },
      {
        path: "payment/:agreementsId",
        Component: Payment,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "Announcements",
        Component: AnnouncementsToAll,
      },
      // {
      //   path: "beAUser",
      //   Component: BeAUser,
      // },
    ],
  },
]);
