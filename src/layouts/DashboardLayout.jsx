import React from "react";
import { NavLink, Outlet } from "react-router";
import Buildinglogo from "../pages/shared/buildingLogo/Buildinglogo";
import {
  FaHome,
  FaUser,
  FaBuilding,
  FaMoneyBillWave,
  FaBullhorn,
} from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  console.log(role);

  const linkClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-200";
  const activeClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg bg-indigo-500 text-white shadow-md";
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <Buildinglogo></Buildinglogo>

          {!roleLoading && role === "member" && (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? activeClass : linkClass
                  }
                >
                  <FaHome className="text-lg" /> Home
                </NavLink>
                {/* <li>
              <NavLink
              to="beAUser"
              className={({ isActive }) => (isActive ? activeClass : linkClass)}
            >
              <FaHome className="text-lg" /> User 
            </NavLink>
            </li> */}
              </li>
              <li>
                <NavLink
                  to="membersProfile"
                  className={({ isActive }) =>
                    isActive ? activeClass : linkClass
                  }
                >
                  <FaUser className="text-lg" /> My Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="myApartment"
                  className={({ isActive }) =>
                    isActive ? activeClass : linkClass
                  }
                >
                  <FaBuilding className="text-lg" /> My Apartment
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="payment-history"
                  className={({ isActive }) =>
                    isActive ? activeClass : linkClass
                  }
                >
                  <FaMoneyBillWave className="text-lg" /> Payment History
                </NavLink>
                <NavLink
                  to="Announcements"
                  className={({ isActive }) =>
                    isActive ? activeClass : linkClass
                  }
                >
                  <FaBullhorn className="text-lg" /> Announcements
                </NavLink>
              </li>
            </>
          )}
          {/* admin role */}
          {!roleLoading && role === "admin" && (
            <>
            <li>
              <NavLink to={"AdminProfile"}>Admin Profile</NavLink>
            </li>
              {/* <li>
                <NavLink to={"PendingMembers"}>Pending Members</NavLink>
              </li>
              <li>
                <NavLink to={"ActiveMembers"}>active Members</NavLink>
              </li>
              <li>
                <NavLink to={"MakeAdmin"}>Make Admin</NavLink>
              </li> */}
              <li>
                <NavLink to={"manageMembers"}>Manage Members</NavLink>
              </li>
              <li>
                <NavLink to={"MakeAnnouncement"}>Make Announcement </NavLink>
              </li>
              <li>
                <NavLink to={"AgreementRequests"}> Agreement Requests</NavLink>
              </li>
              <li>
                <NavLink to={"ManageCoupons"}> Manage Coupons </NavLink>
              </li>

            </>
          )}

          {/* user role */}
          {!roleLoading && role === "user" && (
            <>
              <li>
                <NavLink to={"MyProfile"}> My User profile</NavLink>
              </li>
              <li>
                <NavLink to={"announcement"}>Announcement</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
