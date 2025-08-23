// import React from "react";
// import UseAuth from "./UseAuth";
// import useAxiosSecure from "./useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";

// const useUserRole = () => {
//   const { user, loading: authLoading } = UseAuth();
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: role = "user",
//     isLoading: roleLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["userRole", user?.email],
//     enabled: !authLoading && !!user?.email, // ✅ spelling ঠিক করলাম
//     queryFn: async () => {
//       // const res = await axiosSecure.get(`/user/role/${user.email}`);
//       const res = await axiosSecure.get(`/user/${user.email}/role`);
//       return res.data.role;
//     },
//   });

//   return { role, roleLoading: authLoading || roleLoading, refetch };
// };

// export default useUserRole;

import React, { useEffect } from "react";
import UseAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
  const { user, loading: authLoading } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = "user",
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}/role`);
      return res.data.role;
    },
  });

  // 🔹 এখানে console.log দিয়ে দিলাম
  useEffect(() => {
    if (!authLoading && !roleLoading && user?.email) {
      console.log("👉 Current User Role:", role);
    }
  }, [role, roleLoading, authLoading, user]);

  return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;
