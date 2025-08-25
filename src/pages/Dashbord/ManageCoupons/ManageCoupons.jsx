// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import axios from "axios";

// const ManageCoupons = () => {
//   const queryClient = useQueryClient();
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState({ code: "", discount: "", description: "" });

//   // ✅ Fetch all coupons
//   const { data: coupons = [], isLoading } = useQuery({
//     queryKey: ["coupons"],
//     queryFn: async () => {
//       const res = await axios.get(
//         "https://building-management-server-side-ashen.vercel.app/coupons"
//       );
//       return res.data.data;
//     },
//   });

//   // ✅ Add new coupon
//   const mutation = useMutation({
//     mutationFn: async (newCoupon) => {
//       const res = await axios.post(
//         "https://building-management-server-side-ashen.vercel.app/coupons",
//         newCoupon
//       );
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["coupons"]); // reload coupon list
//       setShowModal(false);
//       setForm({ code: "", discount: "", description: "" });
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     mutation.mutate(form);
//   };

//   if (isLoading) return <p>Loading coupons...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Manage Coupons</h1>

//       {/* Table */}
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2 border">Code</th>
//             <th className="p-2 border">Discount (%)</th>
//             <th className="p-2 border">Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {coupons.map((c) => (
//             <tr key={c._id} className="text-center">
//               <td className="p-2 border">{c.code}</td>
//               <td className="p-2 border">{c.discount}%</td>
//               <td className="p-2 border">{c.description}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Add Coupon Button */}
//       <button
//         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//         onClick={() => setShowModal(true)}
//       >
//         ➕ Add Coupon
//       </button>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Add New Coupon</h2>
//             <form onSubmit={handleSubmit} className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Coupon Code"
//                 className="border p-2 w-full"
//                 value={form.code}
//                 onChange={(e) => setForm({ ...form, code: e.target.value })}
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Discount %"
//                 className="border p-2 w-full"
//                 value={form.discount}
//                 onChange={(e) => setForm({ ...form, discount: e.target.value })}
//                 required
//               />
//               <textarea
//                 placeholder="Description"
//                 className="border p-2 w-full"
//                 value={form.description}
//                 onChange={(e) =>
//                   setForm({ ...form, description: e.target.value })
//                 }
//                 required
//               />
//               <button
//                 type="submit"
//                 className="bg-green-600 text-white px-4 py-2 rounded w-full"
//               >
//                 Submit
//               </button>
//             </form>
//             <button
//               className="mt-3 text-red-500 underline"
//               onClick={() => setShowModal(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageCoupons;


import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // ✅ SweetAlert2 import

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://building-management-server-side-ashen.vercel.app";

  // ✅ সব কুপন লোড করা
  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/coupons`);
      const data = await res.json();
      if (data.success) {
        setCoupons(data.data);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // ✅ নতুন কুপন যোগ করা (SweetAlert input)
  const handleAddCoupon = async () => {
    const { value: formValues } = await Swal.fire({
      title: "➕ Add New Coupon",
      html: `
        <input id="code" class="swal2-input" placeholder="Coupon Code">
        <input id="discount" type="number" class="swal2-input" placeholder="Discount %">
        <input id="description" class="swal2-input" placeholder="Description">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Add Coupon",
      preConfirm: () => {
        const code = document.getElementById("code").value;
        const discount = document.getElementById("discount").value;
        const description = document.getElementById("description").value;

        if (!code || !discount || !description) {
          Swal.showValidationMessage("⚠️ All fields are required!");
          return false;
        }

        return { code, discount, description };
      },
    });

    if (!formValues) return;

    try {
      const res = await fetch(`${API_URL}/coupons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      const data = await res.json();

      if (data.success) {
        Swal.fire("✅ Success!", "Coupon added successfully!", "success");
        fetchCoupons();
      } else {
        Swal.fire("❌ Failed!", data.message || "Error adding coupon", "error");
      }
    } catch (error) {
      Swal.fire("❌ Error!", "Something went wrong!", error);
    }
  };

  // ✅ টগল স্ট্যাটাস
  const handleToggle = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API_URL}/coupons/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: currentStatus === "active" ? "inactive" : "active",
        }),
      });

      const data = await res.json();
      if (data.success) {
        Swal.fire("🔄 Updated!", data.message, "success");
        fetchCoupons();
      }
    } catch (error) {
      Swal.fire("❌ Error!", "Failed to update status", error);
    }
  };

  // ✅ ডিলিট কুপন
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}/coupons/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        Swal.fire("✅ Deleted!", "Coupon has been deleted.", "success");
        fetchCoupons();
      } else {
        Swal.fire("❌ Failed!", data.message || "Error deleting coupon", "error");
      }
    } catch (error) {
      Swal.fire("❌ Error!", "Something went wrong!", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Manage Coupons</h2>

      <button
        onClick={handleAddCoupon}
        className="mb-3 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
      >
        ➕ Add Coupon
      </button>

      {loading ? (
        <p>Loading coupons...</p>
      ) : (
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>Code</th>
              <th>Discount (%)</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id} className="border-t">
                <td>{coupon.code}</td>
                <td>{coupon.discount}%</td>
                <td>{coupon.description}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      coupon.status === "active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {coupon.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleToggle(coupon._id, coupon.status)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageCoupons;
