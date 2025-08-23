import React, { useState } from "react";
import { FaSearch, FaUserShield, FaUserSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  // 🔍 Search User
  const handleSearch = async () => {
    if (!email) return;

    try {
      const res = await axiosSecure.get(`/users/search?email=${email}`);
      setUser(res.data.data);
    } catch (error) {
      console.log(error);
      Swal.fire("Not Found", "No user with this email!", "error");
      setUser(null);
    }
  };

  // 🔑 Make Admin
  const handleMakeAdmin = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make admin",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/${id}`, { role: "admin" });
          if (res.data.modifiedCount > 0) {
            Swal.fire("Success", "User is now an Admin!", "success");
            setUser({ ...user, role: "admin" });
          }
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  // 🔓 Remove Admin
  const handleRemoveAdmin = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will lose admin rights!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove admin",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/${id}`, { role: "user" });
          if (res.data.modifiedCount > 0) {
            Swal.fire("Removed", "User is no longer an Admin!", "success");
            setUser({ ...user, role: "user" });
          }
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Admin</h2>

      {/* Search Form */}
      <div className="flex gap-2 mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter user email"
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          <FaSearch /> Search
        </button>
      </div>

      {/* User Info */}
      {user && (
        <div className="card shadow-lg bg-base-100 p-4">
          <h3 className="text-lg font-semibold">{user.email}</h3>
          <p className="text-sm">Created: {new Date(user.createdAt).toLocaleDateString()}</p>
          <p className="text-sm">
            Role:{" "}
            <span
              className={`badge ${
                user.role === "admin" ? "badge-success" : "badge-info"
              }`}
            >
              {user.role || "member"}
            </span>
          </p>

          <div className="mt-4 flex gap-2">
            {user.role !== "admin" ? (
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleMakeAdmin(user._id)}
              >
                <FaUserShield /> Make Admin
              </button>
            ) : (
              <button
                className="btn btn-error btn-sm"
                onClick={() => handleRemoveAdmin(user._id)}
              >
                <FaUserSlash /> Remove Admin
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAdmin;
