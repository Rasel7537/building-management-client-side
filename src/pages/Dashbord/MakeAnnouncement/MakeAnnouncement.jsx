import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const announcement = {
      title: data.title,
      description: data.description,
    };

    const res = await axiosSecure.post("/announcements", announcement);

    if (res.data.insertedId) {
      Swal.fire("Success!", "Announcement added successfully!", "success");
      reset();
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Make Announcement</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Enter announcement title"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Enter announcement description"
            className="textarea textarea-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Submit Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
