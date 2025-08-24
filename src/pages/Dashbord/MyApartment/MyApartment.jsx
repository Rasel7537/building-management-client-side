
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
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
    refetch,
  } = useQuery({
    queryKey: ["my-apartment", user?.email],
    queryFn: async () => {
      const token = await user.getIdToken();

      const res = await axiosSecure.get(`/agreements?email=${user?.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📌 API Response:", res.data);
      return res.data || []; // ✅ backend থেকে সরাসরি array আসছে
    },
    enabled: !!user?.email,
  });

  // handle payment
  const handlePay = async (id) => {
    const { value: month } = await Swal.fire({
      title: "Enter Rent Month",
      input: "text",
      inputLabel: "Which month’s rent do you want to pay?",
      inputPlaceholder: "e.g. January 2025",
      showCancelButton: true,
    });

    if (!month) return;

    navigate(`/dashboard/payment/${id}`, { state: { month } });
  };

  // handle delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/agreements/${id}`);
      const ok =
        res?.data?.deletedCount > 0 ||
        res?.data?.success === true ||
        res?.status === 200;

      if (ok) {
        await Swal.fire({
          title: "Deleted!",
          text: "Agreement has been deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      Swal.fire({
        title: "Failed!",
        text:
          err?.response?.data?.message ||
          "Something went wrong while deleting the agreement.",
        icon: "error",
      });
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading apartments...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error loading data!</p>;

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
        My Apartments
      </h2>

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
            {agreements.length > 0 ? (
              agreements.map((apt) => (
                <tr key={apt._id}>
                  <td>{apt.apartmentNo || "N/A"}</td>
                  <td>{apt.floor || "-"}</td>
                  <td>{apt.block || "-"}</td>
                  <td>{apt.rent ? `${apt.rent} ৳` : "-"}</td>
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
                      disabled={apt.status === "paid"}
                    >
                      Pay
                    </button>
                    <button
                      onClick={() => handleDelete(apt._id)}
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
