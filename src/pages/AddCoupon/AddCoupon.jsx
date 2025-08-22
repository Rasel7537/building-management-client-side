import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const AddCoupon = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    axios.post("http://localhost:5000/coupons", data)
      .then(res => {
        if (res.data.success) {
          Swal.fire("Success!", "Coupon added successfully!", "success");
          reset();
        }
      })
      .catch(err => {
        console.error(err);
        Swal.fire("Error!", "Failed to add coupon", "error");
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-primary">Add New Coupon</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title", { required: true })}
          placeholder="Coupon Title"
          className="input input-bordered w-full"
        />
        <input
          {...register("code", { required: true })}
          placeholder="Coupon Code"
          className="input input-bordered w-full"
        />
        <textarea
          {...register("description", { required: true })}
          placeholder="Coupon Description"
          className="textarea textarea-bordered w-full"
        ></textarea>
        <button type="submit" className="btn btn-primary w-full">Add Coupon</button>
      </form>
    </div>
  );
};

export default AddCoupon;
