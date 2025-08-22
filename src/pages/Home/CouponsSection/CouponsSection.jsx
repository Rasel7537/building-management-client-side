import { useEffect, useState } from "react";
import axios from "axios";
import { FaTag } from "react-icons/fa";

const CouponSection = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/coupons").then((res) => {
      setCoupons(res.data);
    });
  }, []);

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">
        🏷️ Special Coupons For You
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon, index) => (
          <div
            key={index}
            className="card shadow-lg bg-gradient-to-br from-indigo-100 to-white p-4"
          >
            <div className="card-body space-y-2">
              <h3 className="text-xl font-bold text-purple-700 flex items-center gap-2">
                <FaTag /> {coupon.title}
              </h3>
              <p className="text-sm text-gray-600">{coupon.description}</p>
              <div className="badge badge-outline badge-primary p-3 mt-2">
                Code: <span className="ml-1 font-mono">{coupon.code}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponSection;
