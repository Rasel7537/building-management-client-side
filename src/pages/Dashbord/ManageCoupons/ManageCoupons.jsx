import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

const ManageCoupons = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ code: "", discount: "", description: "" });

  // ✅ Fetch all coupons
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axios.get(
        "https://building-management-server-side-ashen.vercel.app/coupons"
      );
      return res.data.data;
    },
  });

  // ✅ Add new coupon
  const mutation = useMutation({
    mutationFn: async (newCoupon) => {
      const res = await axios.post(
        "https://building-management-server-side-ashen.vercel.app/coupons",
        newCoupon
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["coupons"]); // reload coupon list
      setShowModal(false);
      setForm({ code: "", discount: "", description: "" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  if (isLoading) return <p>Loading coupons...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Coupons</h1>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Code</th>
            <th className="p-2 border">Discount (%)</th>
            <th className="p-2 border">Description</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((c) => (
            <tr key={c._id} className="text-center">
              <td className="p-2 border">{c.code}</td>
              <td className="p-2 border">{c.discount}%</td>
              <td className="p-2 border">{c.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Coupon Button */}
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setShowModal(true)}
      >
        ➕ Add Coupon
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Coupon</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Coupon Code"
                className="border p-2 w-full"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Discount %"
                className="border p-2 w-full"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                className="border p-2 w-full"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded w-full"
              >
                Submit
              </button>
            </form>
            <button
              className="mt-3 text-red-500 underline"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
