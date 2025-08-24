// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import UseAuth from "../../../hooks/UseAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const MembersProfile = () => {
//   const { user } = UseAuth();
//   const axiosSecure = useAxiosSecure();

//   // agreements fetch with react-query
//   const {
//     data: agreement = null,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["member-profile", user?.email],
//     queryFn: async () => {
//       const token = await user.getIdToken(); // Firebase JWT
//       const res = await axiosSecure.get(`/agreements?email=${user?.email}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // যদি multiple agreements থাকে → last একটাকে নিব
//       return Array.isArray(res.data.data) && res.data.data.length > 0
//         ? res.data.data[res.data.data.length - 1]
//         : null;
//     },
//     enabled: !!user?.email,
//   });

//   if (isLoading) return <p>Loading profile...</p>;
//   if (isError) return <p className="text-red-500">Error loading profile!</p>;

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <div className="card shadow-lg rounded-2xl p-6">
//         <div className="flex items-center gap-4 mb-4">
//           <img
//             src={user?.photoURL}
//             alt={user?.displayName}
//             className="w-16 h-16 rounded-full"
//           />
//           <div>
//             <h2 className="text-xl font-bold">{user?.displayName}</h2>
//             <p className="text-gray-500">{user?.email}</p>
//           </div>
//         </div>

//         <ul className="space-y-2 text-gray-700">
//           <li>
//             📅 Agreement Date: {agreement?.agreementDate || "Not Available"}
//           </li>
//           <li>🏢 Floor: {agreement?.floor || "None"}</li>
//           <li>🏘 Block: {agreement?.block || "None"}</li>
//           <li>🚪 Apartment: {agreement?.apartmentNo || "None"}</li>
//           <li>💰 Rent: {agreement?.rent || "None"} ৳</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MembersProfile;










import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MembersProfile = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  // agreements fetch with react-query
  const {
    data: agreement = null,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["member-profile", user?.email],
    queryFn: async () => {
      const token = await user.getIdToken(); // Firebase JWT
      console.log("🔑 Logged-in User Email:", user?.email);

      const res = await axiosSecure.get(`/agreements?email=${user?.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📦 API Raw Response:", res.data);

      // এখানে ধরছি API থেকে সরাসরি array আসবে
      if (Array.isArray(res.data) && res.data.length > 0) {
        console.log("✅ Agreement Found:", res.data[res.data.length - 1]);
        return res.data[res.data.length - 1];
      } else {
        console.log("⚠️ No agreement found for this user!");
        return null;
      }
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading profile...</p>;
  if (isError) return <p className="text-red-500">Error loading profile!</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="card shadow-lg rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">{user?.displayName}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        <ul className="space-y-2 text-gray-700">
          <li>📅 Agreement Date: {agreement?.agreementDate || "Not Available"}</li>
          <li>🏢 Floor: {agreement?.floor || "None"}</li>
          <li>🏘 Block: {agreement?.block || "None"}</li>
          <li>🚪 Apartment: {agreement?.apartmentNo || "None"}</li>
          <li>💰 Rent: {agreement?.rent || "None"} ৳</li>
        </ul>
      </div>
    </div>
  );
};

export default MembersProfile;
