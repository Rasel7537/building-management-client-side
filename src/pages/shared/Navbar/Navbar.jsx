import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Buildinglogo from "../buildingLogo/Buildinglogo";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // ✅ Correct useState usage
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  console.log(role, loading);
  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://building-management-server-side-ashen.vercel.app/users/${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRole(data?.role);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching role:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire("Logged out!", "You have been logged out.", "success");
          })
          .catch((err) => {
            Swal.fire("Oops!", "Logout failed!", "error");
            console.error(err);
          });
      }
    });
  };

  const navItems = (
    <>
      <li className="text-black">
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li className="text-black">
        <NavLink to={"/apartments"}>Apartments</NavLink>
      </li>

      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white backdrop-blur-lg rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <Buildinglogo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="flex items-center navbar-end gap-3.5 mx-24">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
              data-tip={user.displayName || "User"}
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ">
                <img
                  src={
                    user.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"
                  }
                  alt="profile"
                />
              </div>
            </div>

            {/* ✅ Dropdown items */}
            <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 ">
              {/* User name only */}
              <li className="text-center font-semibold cursor-default">
                {user.displayName || "Anonymous User"}
              </li>
              <div className="divider my-1"></div>

              {/* Dashboard link */}
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>

              {/* Logout button */}
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-outline btn-primary flex items-center gap-2 mx-24"
          >
            <FaUserCircle className="text-xl" />
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
