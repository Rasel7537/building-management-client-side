import React from "react";
import UseAuth from "../../../hooks/UseAuth";

const MyProfile = () => {
  const { user } = UseAuth();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="card bg-base-100 shadow-2xl rounded-2xl hover:shadow-primary/30 transition duration-300">
        <div className="card-body items-center text-center">
          {/* User Photo */}
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-md">
              <img
                src={user?.photoURL || "https://i.ibb.co/2nqZQFz/default-avatar.png"}
                alt={user?.displayName || "User"}
              />
            </div>
          </div>

          {/* Name + Email */}
          <h2 className="text-3xl font-bold mt-4 text-primary">
            {user?.displayName || "Anonymous"}
          </h2>
          <p className="text-sm opacity-70">{user?.email}</p>

          {/* Divider */}
          <div className="divider my-4"></div>

          {/* Info Section */}
          <div className="w-full text-left space-y-3">
            <p className="text-lg">
              <span className="font-semibold text-gray-700">
                Agreement Accept Date:
              </span>{" "}
              <span className="text-gray-500">None</span>
            </p>

            <p className="text-lg">
              <span className="font-semibold text-gray-700">Floor:</span>{" "}
              <span className="text-gray-500">None</span>
            </p>
            <p className="text-lg">
              <span className="font-semibold text-gray-700">Block:</span>{" "}
              <span className="text-gray-500">None</span>
            </p>
            <p className="text-lg">
              <span className="font-semibold text-gray-700">Room No:</span>{" "}
              <span className="text-gray-500">None</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;






