import { useEffect, useState } from "react";
import axios from "axios";
import { FaBullhorn } from "react-icons/fa";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios
      .get("https://building-management-server-side-ashen.vercel.app/announcements")
      .then((res) => {
        setAnnouncements(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch announcements:", err);
      });
  }, []);

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary flex items-center justify-center gap-2">
        <FaBullhorn className="text-primary" /> Announcements
      </h2>

      <div className="space-y-4 max-w-3xl mx-auto">
        {announcements.length > 0 ? (
          announcements.map((item, index) => (
            <div key={index} className="alert alert-info shadow-md">
              <FaBullhorn className="text-xl text-white" />
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p>{item.message}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No announcements available.</p>
        )}
      </div>
    </div>
  );
};

export default Announcements;
