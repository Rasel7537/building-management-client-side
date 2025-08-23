import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBan } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Members = () => {
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch ALL Members
  const { data: members = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/members");
      return res.data.data;
    },
  });

  // ✅ Handle Deactivate
  const handleDeactivate = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This member will be deactivated!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/members/${id}`, {
            status: "inactive",
          });

          if (res.data.modifiedCount > 0) {
            Swal.fire("Deactivated!", "Member has been deactivated.", "success");
            refetch(); // refresh list
          }
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  if (isLoading) return <p className="text-center">Loading members...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load members.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">All Members</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200">
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No members found.
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member._id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        member.status === "active"
                          ? "badge-success"
                          : member.status === "pending"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-info">{member.role}</span>
                  </td>
                  <td className="text-center">
                    {member.status === "active" && (
                      <button
                        className="btn btn-error btn-sm text-white"
                        onClick={() => handleDeactivate(member._id)}
                      >
                        <FaBan /> Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
