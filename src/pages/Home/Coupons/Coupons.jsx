import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTicketAlt } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://building-management-server-side-ashen.vercel.app/coupons")
      .then((res) => {
        if (res.data.success) {
          setCoupons(res.data.data || []);
        } else {
          setCoupons([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching coupons:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
        <FaTicketAlt className="text-primary" /> Available Coupons
      </h2>

      {coupons.length === 0 ? (
        <p className="text-center text-gray-500">
          No coupons available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="card bg-base-100 shadow-xl border hover:shadow-2xl transition duration-300"
            >
              <div className="card-body">
                <h3 className="card-title text-primary flex items-center gap-2">
                  <MdDiscount className="text-2xl" /> {coupon.code}
                </h3>
                <p className="text-gray-600">{coupon.description}</p>
                <div className="mt-3">
                  <span className="badge badge-primary badge-outline text-lg p-3">
                    {coupon.discount}% OFF
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-3">
                  Created At:{" "}
                  {new Date(coupon.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm">
                    Apply Coupon
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Coupons;


