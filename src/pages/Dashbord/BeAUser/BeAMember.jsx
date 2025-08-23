// import React, { useState } from "react";
// import { FaUser, FaEnvelope } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";
// import UseAuth from "../../../hooks/UseAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const MemberForm = () => {
//   const { user } = UseAuth();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();

//   const [memberData, setMemberData] = useState({
//     id: "",
//     name: user?.displayName || "",
//     email: user?.email || "",
//     photoURL: "",
//     status: "pending", // ✅ ডিফল্ট pending
//   });

//   // ✅ image upload handler
//   const handleImageUpload = async (e) => {
//     const image = e.target.files[0];
//     if (!image) return;

//     const formDataImg = new FormData();
//     formDataImg.append("image", image);

//     const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
//       import.meta.env.VITE_image_upload_key
//     }`;

//     try {
//       // 1️⃣ Upload to imgbb
//       const res = await axios.post(imageUploadUrl, formDataImg);
//       const imageUrl = res.data.data.url;

//       // 2️⃣ Update state with photo URL
//       setMemberData((prev) => ({ ...prev, photoURL: imageUrl }));

//       Swal.fire({
//         icon: "success",
//         title: "Image Uploaded",
//         text: "Profile picture uploaded successfully!",
//         confirmButtonColor: "#3085d6",
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Upload Failed",
//         text: error.message,
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   // ✅ form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // 🔥 calling `/members`
//       const res = await axiosSecure.post("/members", memberData);

//       if (res.data.insertedId) {
//         Swal.fire({
//           icon: "success",
//           title: "Form Submitted",
//           text: "Your membership data has been submitted!",
//           confirmButtonColor: "#3085d6",
//         }).then(() => {
//           navigate("/");
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Submission Failed",
//         text: error.message,
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-base-200">
//       <div className="card w-full max-w-md shadow-xl bg-white">
//         <div className="card-body">
//           <h2 className="text-2xl font-bold text-center mb-4">Be A Member</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Name */}
//             <label className="input input-bordered flex items-center gap-2">
//               <FaUser />
//               <input
//                 type="text"
//                 name="name"
//                 value={memberData.name}
//                 onChange={(e) =>
//                   setMemberData({ ...memberData, name: e.target.value })
//                 }
//                 className="grow"
//                 placeholder="Enter your name"
//               />
//             </label>

//             {/* Email */}
//             <label className="input input-bordered flex items-center gap-2">
//               <FaEnvelope />
//               <input
//                 type="email"
//                 name="email"
//                 value={memberData.email}
//                 onChange={(e) =>
//                   setMemberData({ ...memberData, email: e.target.value })
//                 }
//                 className="grow"
//                 placeholder="Enter your email"
//               />
//             </label>

//             {/* Photo Upload */}
//             <div className="form-control">
//               <label className="label font-semibold">Upload Profile Photo</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="file-input file-input-bordered w-full"
//               />
//               {memberData.photoURL && (
//                 <img
//                   src={memberData.photoURL}
//                   alt="Preview"
//                   className="mt-2 w-24 h-24 rounded-full object-cover border"
//                 />
//               )}
//             </div>

//             <button type="submit" className="btn btn-primary w-full">
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemberForm;





import React, { useState } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MemberForm = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [memberData, setMemberData] = useState({
    id: "",
    name: user?.displayName || "",
    email: user?.email || "",
    photoURL: "",
    status: "pending",   // ✅ ডিফল্ট pending
    role: "member",      // ✅ ডিফল্ট role member
  });

  // ✅ image upload handler
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formDataImg = new FormData();
    formDataImg.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    try {
      // 1️⃣ Upload to imgbb
      const res = await axios.post(imageUploadUrl, formDataImg);
      const imageUrl = res.data.data.url;

      // 2️⃣ Update state with photo URL
      setMemberData((prev) => ({ ...prev, photoURL: imageUrl }));

      Swal.fire({
        icon: "success",
        title: "Image Uploaded",
        text: "Profile picture uploaded successfully!",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error.message,
        confirmButtonColor: "#d33",
      });
    }
  };

  // ✅ form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 calling `/members`
      const res = await axiosSecure.post("/members", memberData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Form Submitted",
          text: "Your membership data has been submitted!",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message,
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-white">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Be A Member</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <label className="input input-bordered flex items-center gap-2">
              <FaUser />
              <input
                type="text"
                name="name"
                value={memberData.name}
                onChange={(e) =>
                  setMemberData({ ...memberData, name: e.target.value })
                }
                className="grow"
                placeholder="Enter your name"
              />
            </label>

            {/* Email */}
            <label className="input input-bordered flex items-center gap-2">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                value={memberData.email}
                onChange={(e) =>
                  setMemberData({ ...memberData, email: e.target.value })
                }
                className="grow"
                placeholder="Enter your email"
              />
            </label>

            {/* Photo Upload */}
            <div className="form-control">
              <label className="label font-semibold">Upload Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full"
              />
              {memberData.photoURL && (
                <img
                  src={memberData.photoURL}
                  alt="Preview"
                  className="mt-2 w-24 h-24 rounded-full object-cover border"
                />
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberForm;
