import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PendingMembers = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const axiosSecure = useAxiosSecure();

  // ✅ Load pending members
  useEffect(() => {
    const fetchMembers = async () => {
      console.log("Fetching pending members...");
      try {
        const res = await axiosSecure.get("/members/pending");
        console.log("Members fetched:", res.data);
        setMembers(res.data.data || []);
      } catch (error) {
        console.error("Error loading pending members:", error.message);
      }
    };
    fetchMembers();
  }, [axiosSecure]);

  // ✅ Approve / Cancel Action
  const handleAction = async (memberId, status ,email) => {
    console.log("Sending PATCH request:", memberId, status);
    try {
      const res = await axiosSecure.patch(`/members/${memberId}`, { 
        status,
        email

       });
      console.log("Response from server:", res.data);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: `Member ${status}`,
          text: res.data.message || `Member has been ${status} successfully!`,
        });

        // ✅ Update UI immediately (remove updated member from list)
        setMembers((prev) => prev.filter((m) => m._id !== memberId));

        // ✅ Close modal if it's open
        const modal = document.getElementById("member_modal");
        if (modal) modal.close();
      } else {
        Swal.fire(
          "No Change",
          res.data.message || "No member was updated.",
          "info"
        );
      }
    } catch (error) {
      console.error("❌ PATCH Failed:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Action Failed",
        text: error.response?.data?.message || "Unknown error",
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Pending Members</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead>
            <tr className="bg-base-200">
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No pending members found.
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member._id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>
                    <span className="badge badge-warning">{member.status}</span>
                  </td>
                  <td className="flex justify-center gap-2">
                    {/* View Button */}
                    <button
                      className="btn btn-info btn-sm text-white"
                      onClick={() => {
                        setSelectedMember(member);
                        document.getElementById("member_modal").showModal();
                      }}
                    >
                      <FaEye />
                    </button>

                    {/* Approve Button */}
                    <button
                      className="btn btn-success btn-sm text-white"
                      onClick={() => handleAction(member._id, "active",member.email)}
                    >
                      <FaCheck />
                    </button>

                    {/* Cancel Button */}
                    <button
                      className="btn btn-error btn-sm text-white"
                      onClick={() => handleAction(member._id, "cancelled",member.email)}
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal */}
      <dialog id="member_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Member Information</h3>
          {selectedMember && (
            <div className="mt-3 space-y-2">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {selectedMember.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {selectedMember.email}
              </p>
              <p>
                <span className="font-semibold">ID:</span> {selectedMember._id}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {selectedMember.status}
              </p>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn">Close</button>
              {selectedMember && (
                <>
                  <button
                    type="button"
                    className="btn btn-success text-white"
                    onClick={() => handleAction(selectedMember._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="btn btn-error text-white"
                    onClick={() =>
                      handleAction(selectedMember._id, "cancelled")
                    }
                  >
                    Cancel
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PendingMembers;
