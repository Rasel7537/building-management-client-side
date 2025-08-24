import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; 
import { FaBullhorn } from "react-icons/fa";

const Announcement = () => {
  const axiosSecure = useAxiosSecure();

  // fetch announcements
  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-2 text-primary">
        <FaBullhorn className="text-primary" /> Announcements
      </h2>

      {/* Cards */}
      {announcements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="card-body">
                <h3 className="card-title text-lg text-blue-600">
                  {item.title}
                  <div className="badge badge-secondary ml-2">New</div>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
                <div className="card-actions justify-end mt-4">
                  <span className="text-sm text-gray-500">
                    📅 {new Date(item.date).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No announcements available.
        </div>
      )}
    </div>
  );
};

export default Announcement;
