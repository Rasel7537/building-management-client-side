import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AgreementRequests = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch agreements with status "pending"
  const { data: agreements = [], refetch } = useQuery({
    queryKey: ["agreements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agreements?status=pending");
      return res.data;
    },
  });

  // Handle Accept with SweetAlert confirm
  const handleAccept = async (agreement) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Accept ${agreement.userName}'s request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(
            `/agreements/accept/${agreement._id}`
          );
          if (res.data.modifiedCount > 0) {
            Swal.fire(
              "Accepted!",
              `${agreement.userName} is now a member.`,
              "success"
            );
            refetch();
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  // Handle Reject with SweetAlert confirm
  const handleReject = async (agreement) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Reject ${agreement.userName}'s request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(
            `/agreements/reject/${agreement._id}`
          );
          if (res.data.modifiedCount > 0) {
            Swal.fire(
              "Rejected!",
              `${agreement.userName}'s request rejected.`,
              "error"
            );
            refetch();
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Agreement Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Floor</th>
              <th>Block</th>
              <th>Room No</th>
              <th>Rent</th>
              <th>Request Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {agreements.map((agreement, index) => (
              <tr key={agreement._id} className="hover">
                <td>{index + 1}</td>
                <td>{agreement.userName}</td>
                <td>{agreement.userEmail}</td>
                <td>{agreement.floor}</td>
                <td>{agreement.block}</td>
                <td>{agreement.apartmentNo}</td>
                <td>{agreement.rent}</td>
                {/* <td>{new Date(agreement.requestDate).toLocaleDateString()}</td> */}
                <td>
                  {agreement.acceptedDate
                    ? new Date(agreement.acceptedDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleAccept(agreement)}
                    className="btn btn-success btn-sm flex items-center gap-1"
                  >
                    <FaCheckCircle /> Accept
                  </button>
                  <button
                    onClick={() => handleReject(agreement)}
                    className="btn btn-error btn-sm flex items-center gap-1"
                  >
                    <FaTimesCircle /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgreementRequests;
