import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();

  // fetch members
  const { data: members = [], refetch } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/members");
      return res.data;
    },
  });

  // handle remove
  const handleRemove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This member will be converted to a normal user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/remove-member/${id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Removed!", "The member has been converted to user.", "success");
          refetch();
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Members</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>
                <button
                  onClick={() => handleRemove(member._id)}
                  className="btn btn-error btn-sm"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMembers;
