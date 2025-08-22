// import { useForm } from "react-hook-form";
// import {
//   FaBuilding,
//   FaLayerGroup,
//   FaThLarge,
//   FaHome,
//   FaMoneyBill,
//   FaClock,
// } from "react-icons/fa";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const AddApartment = () => {
//   const axiosSecure = useAxiosSecure();

//   // React Hook Form setup
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   // Handle form submission
//   const onSubmit = async (data) => {
//     const apartmentData = { ...data, status: "pending" }; // Add default status before sending
//     try {
//       const res = await axiosSecure.post("/apartments", apartmentData); // POST to backend
//       if (res.data.insertedId) {
//         Swal.fire("Success!", "Apartment added successfully!", "success");
//         reset(); // Clear the form after successful submission
//       }
//     } catch (err) {
//       Swal.fire("Error!", "Something went wrong.", "error");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 py-10">
//       <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 md:p-10">
//         <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
//           Add Apartment
//         </h2>

//         {/* Apartment form start */}
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Apartment Image URL Field */}
//           <div>
//             <label className="label font-semibold flex items-center gap-1">
//               <FaBuilding /> Apartment Image URL
//             </label>
//             <input
//               {...register("image", { required: "Image URL is required" })}
//               type="text"
//               placeholder="https://example.com/image.jpg"
//               className="input input-bordered w-full"
//             />
//             {errors.image && (
//               <p className="text-red-500 text-sm">{errors.image.message}</p>
//             )}
//           </div>

//           {/* Floor Number Field */}
//           <div>
//             <label className="label font-semibold flex items-center gap-1">
//               <FaLayerGroup /> Floor No
//             </label>
//             <input
//               {...register("floor", { required: "Floor number is required" })}
//               type="number"
//               placeholder="e.g. 3"
//               className="input input-bordered w-full"
//             />
//             {errors.floor && (
//               <p className="text-red-500 text-sm">{errors.floor.message}</p>
//             )}
//           </div>

//           {/* Block Name Field */}
//           <div>
//             <label className="label font-semibold flex items-center gap-1">
//               <FaThLarge /> Block Name
//             </label>
//             <input
//               {...register("block", { required: "Block name is required" })}
//               type="text"
//               placeholder="e.g. A / B / C"
//               className="input input-bordered w-full"
//             />
//             {errors.block && (
//               <p className="text-red-500 text-sm">{errors.block.message}</p>
//             )}
//           </div>

//           {/* Apartment Number Field */}
//           <div>
//             <label className="label font-semibold flex items-center gap-1">
//               <FaHome /> Apartment No
//             </label>
//             <input
//               {...register("apartmentNo", {
//                 required: "Apartment number is required",
//               })}
//               type="text"
//               placeholder="e.g. 4A"
//               className="input input-bordered w-full"
//             />
//             {errors.apartmentNo && (
//               <p className="text-red-500 text-sm">
//                 {errors.apartmentNo.message}
//               </p>
//             )}
//           </div>

//           {/* Rent Field */}
//           <div>
//             <label className="label font-semibold flex items-center gap-1">
//               <FaMoneyBill /> Rent (৳)
//             </label>
//             <input
//               {...register("rent", { required: "Rent amount is required" })}
//               type="number"
//               placeholder="e.g. 15000"
//               className="input input-bordered w-full"
//             />
//             {errors.rent && (
//               <p className="text-red-500 text-sm">{errors.rent.message}</p>
//             )}
//           </div>

//           {/* Status Field (Read-only) */}
//           <div>
//             <label className="label font-semibold flex items-center gap-1">
//               <FaClock /> Status
//             </label>
//             <input
//               type="text"
//               value="pending"
//               readOnly
//               className="input input-bordered w-full bg-gray-100 text-gray-500"
//             />
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="btn btn-primary w-full mt-4">
//             Add Apartment
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddApartment;





import { useForm } from "react-hook-form";
import {
  FaBuilding,
  FaLayerGroup,
  FaThLarge,
  FaHome,
  FaMoneyBill,
  FaClock,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // 🚀 added for redirection
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddApartment = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); // 🚀 navigate hook

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    const apartmentData = { ...data, status: "pending" }; // Add default status before sending
    try {
      const res = await axiosSecure.post("/apartments", apartmentData); // POST to backend
      if (res.data.insertedId) {
        // ✅ show SweetAlert then navigate
        Swal.fire("Success!", "Apartment added successfully!", "success").then(() => {
          reset(); // clear form
          navigate("/"); // redirect to apartments page
        });
      }
    } catch (err) {
      Swal.fire("Error!", "Something went wrong.", "error");
      console.error(err);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 md:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Add Apartment
        </h2>

        {/* Apartment form start */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Apartment Image URL Field */}
          <div>
            <label className="label font-semibold flex items-center gap-1">
              <FaBuilding /> Apartment Image URL
            </label>
            <input
              {...register("image", { required: "Image URL is required" })}
              type="text"
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          {/* Floor Number Field */}
          <div>
            <label className="label font-semibold flex items-center gap-1">
              <FaLayerGroup /> Floor No
            </label>
            <input
              {...register("floor", { required: "Floor number is required" })}
              type="number"
              placeholder="e.g. 3"
              className="input input-bordered w-full"
            />
            {errors.floor && (
              <p className="text-red-500 text-sm">{errors.floor.message}</p>
            )}
          </div>

          {/* Block Name Field */}
          <div>
            <label className="label font-semibold flex items-center gap-1">
              <FaThLarge /> Block Name
            </label>
            <input
              {...register("block", { required: "Block name is required" })}
              type="text"
              placeholder="e.g. A / B / C"
              className="input input-bordered w-full"
            />
            {errors.block && (
              <p className="text-red-500 text-sm">{errors.block.message}</p>
            )}
          </div>

          {/* Apartment Number Field */}
          <div>
            <label className="label font-semibold flex items-center gap-1">
              <FaHome /> Apartment No
            </label>
            <input
              {...register("apartmentNo", {
                required: "Apartment number is required",
              })}
              type="text"
              placeholder="e.g. 4A"
              className="input input-bordered w-full"
            />
            {errors.apartmentNo && (
              <p className="text-red-500 text-sm">
                {errors.apartmentNo.message}
              </p>
            )}
          </div>

          {/* Rent Field */}
          <div>
            <label className="label font-semibold flex items-center gap-1">
              <FaMoneyBill /> Rent (৳)
            </label>
            <input
              {...register("rent", { required: "Rent amount is required" })}
              type="number"
              placeholder="e.g. 15000"
              className="input input-bordered w-full"
            />
            {errors.rent && (
              <p className="text-red-500 text-sm">{errors.rent.message}</p>
            )}
          </div>

          {/* Status Field (Read-only) */}
          <div>
            <label className="label font-semibold flex items-center gap-1">
              <FaClock /> Status
            </label>
            <input
              type="text"
              value="pending"
              readOnly
              className="input input-bordered w-full bg-gray-100 text-gray-500"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full mt-4">
            Add Apartment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddApartment;
