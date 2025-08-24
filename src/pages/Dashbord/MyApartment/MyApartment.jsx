
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2"; // SweetAlert2 import
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const MyApartment = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // fetch agreements
  const {
    data: agreements = [],
    isLoading,
    isError,
    refetch, // will be used after delete
  } = useQuery({
    queryKey: ["my-apartment", user?.email],
    queryFn: async () => {
      // ⚡ CHANGED: Get Firebase ID token instead of using user.accessToken directly
      const token = await user.getIdToken(); // English comment: fetch Firebase JWT

      const res = await axiosSecure.get(`/agreements?email=${user?.email}`, {
        headers: {
          Authorization: `Bearer ${token}`, // English comment: attach Firebase token
        },
      });
      return res.data.data; // array
    },
    enabled: !!user?.email,
  });

  // handle payment
  const handlePay = async (id) => {
    console.log("proceed to payment for", id);

    // 👉 Ask for month input before navigating
    const { value: month } = await Swal.fire({
      title: "Enter Rent Month",
      input: "text",
      inputLabel: "Which month’s rent do you want to pay?",
      inputPlaceholder: "e.g. January 2025",
      showCancelButton: true,
    });

    if (!month) return; // if cancelled, stop

    // 👉 Pass month info with navigate (via state)
    navigate(`/dashboard/payment/${id}`, { state: { month } });
  };

  // handle delete with confirmation
  const handleDelete = async (id) => {
    // 1) ask for confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      // 2) call delete API
      const res = await axiosSecure.delete(`/agreements/${id}`);

      // BE might return {deletedCount: 1} or {success: true}, handle both
      const ok =
        res?.data?.deletedCount > 0 ||
        res?.data?.success === true ||
        res?.status === 200;

      if (ok) {
        // 3) show success
        await Swal.fire({
          title: "Deleted!",
          text: "Agreement has been deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        // 4) refresh table
        refetch();
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      // show error
      Swal.fire({
        title: "Failed!",
        text:
          err?.response?.data?.message ||
          "Something went wrong while deleting the agreement.",
        icon: "error",
      });
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading apartments...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Error loading data!</p>
    );
  }

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
        My Apartments
      </h2>

      {/* responsive wrapper */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-xs sm:text-sm md:text-base">
          <thead>
            <tr>
              <th>Apartment No</th>
              <th>Floor</th>
              <th>Block</th>
              <th>Rent</th>
              <th className="hidden md:table-cell">User Name</th>
              <th className="hidden md:table-cell">User Email</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(agreements) && agreements.length > 0 ? (
              agreements.map((apt) => (
                <tr key={apt._id}>
                  <td>{apt.apartmentNo}</td>
                  <td>{apt.floor}</td>
                  <td>{apt.block}</td>
                  <td>{apt.rent} ৳</td>
                  <td className="hidden md:table-cell">{apt.userName}</td>
                  <td className="hidden md:table-cell break-all">
                    {apt.userEmail}
                  </td>
                  <td>
                    {apt.status === "paid" ? (
                      <span className="badge badge-success">Paid</span>
                    ) : (
                      <span className="badge badge-warning">Unpaid</span>
                    )}
                  </td>
                  <td className="flex flex-col sm:flex-row gap-2 justify-center">
                    <button className="btn btn-xs sm:btn-sm btn-info">
                      View
                    </button>
                    <button
                      onClick={() => handlePay(apt._id)}
                      className="btn btn-xs sm:btn-sm btn-success"
                      disabled={apt.status === "paid"} // ✅ disable if already paid
                    >
                      Pay
                    </button>
                    <button
                      onClick={() => handleDelete(apt._id)} // <-- bind delete
                      className="btn btn-xs sm:btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500">
                  No apartments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApartment;
