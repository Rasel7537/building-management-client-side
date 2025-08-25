import { useEffect, useState } from "react";
import axios from "axios";

const AdminProfile = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://building-management-server-side-ashen.vercel.app/admin/summary"
      )
      .then((res) => setSummary(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-2xl shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src={summary.admin.image}
          alt="Admin"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{summary.admin.name}</h2>
          <p className="text-gray-500">{summary.admin.email}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p>🏠 Total Rooms: {summary.apartments.totalRooms}</p>
        <p>✅ Available: {summary.apartments.availablePercentage}%</p>
        <p>❌ Unavailable: {summary.apartments.unavailablePercentage}%</p>
        <p>👤 Total Users: {summary.users.totalUsers}</p>
        <p>👥 Members: {summary.users.totalMembers}</p>
      </div>
    </div>
  );
};

export default AdminProfile;
