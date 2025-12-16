
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHome,
  FaLayerGroup,
  FaMoneyBillWave,
  FaThLarge,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth"; // 🔑 custom auth hook
import Swal from "sweetalert2";

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [allApartments, setAllApartments] = useState([]); // ✅ master copy
  const [currentPage, setCurrentPage] = useState(1);
  const apartmentsPerPage = 6;
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");

  const { user } = UseAuth(); // 🔑 logged-in user
  const navigate = useNavigate();

  // ⭐ fetch apartments once
  useEffect(() => {
    axios
      .get("https://building-management-server-side-ashen.vercel.app/apartments")
      .then((res) => {
        setApartments(res.data);
        setAllApartments(res.data); // ✅ keep full data
      });
  }, []);

  // 🔍 filter by rent
  const handleSearch = () => {
    const filtered = allApartments.filter(
      (apt) =>
        apt.rent >= parseInt(minRent || 0) &&
        apt.rent <= parseInt(maxRent || Infinity)
    );
    setApartments(filtered);
    setCurrentPage(1);
  };

  // 📝 agreement handler
  const handleAgreement = (apt) => {
    // 1️⃣ not logged in → redirect
    if (!user) return navigate("/login");

    // 2️⃣ build agreement object
    const agreementData = {
      userName: user.displayName,
      userEmail: user.email,
      floor: apt.floor,
      block: apt.block,
      apartmentNo: apt.apartmentNo,
      rent: apt.rent,
      status: "pending",
    };

    // 3️⃣ POST to backend
    axios
      .post(
        "https://building-management-server-side-ashen.vercel.app/agreements",
        agreementData
      )
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire(
            "Request Sent!",
            "Your agreement request is pending approval.",
            "success"
          );
        } else {
          Swal.fire("Oops!", "You already applied for an apartment.", "info");
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error!", "Something went wrong.", "error");
      });
  };

  // ℹ️ pagination math
  const indexOfLast = currentPage * apartmentsPerPage;
  const indexOfFirst = indexOfLast - apartmentsPerPage;
  const currentApartments = apartments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(apartments.length / apartmentsPerPage);

  return (
    <div className="px-4 sm:px-8 py-8">
      <h1 className="text-3xl font-bold text-center my-6 text-primary">
        🏢 Available Apartments
      </h1>

      {/* search */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <FaMoneyBillWave className="text-primary" />
          <input
            type="number"
            placeholder="Min Rent"
            className="input input-bordered"
            value={minRent}
            onChange={(e) => setMinRent(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <FaMoneyBillWave className="text-primary" />
          <input
            type="number"
            placeholder="Max Rent"
            className="input input-bordered"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary gap-2" onClick={handleSearch}>
          <FaSearch /> Search
        </button>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentApartments.length ? (
          currentApartments.map((apt) => (
            <div
              key={apt._id}
              className="card bg-base-100 shadow-lg border hover:shadow-xl transition-all"
            >
              <figure>
                <img
                  src={apt.image}
                  alt={`Apartment ${apt.apartmentNo}`}
                  className="h-72 w-full object-cover rounded-t-xl"
                />
              </figure>
              <div className="card-body space-y-2">
                <h2 className="card-title text-lg">
                  <FaHome className="text-primary" /> Apartment {apt.apartmentNo}
                </h2>
                <p className="flex items-center gap-2 text-sm">
                  <FaLayerGroup className="text-primary" /> Floor:{" "}
                  <span className="font-semibold">{apt.floor}</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <FaThLarge className="text-primary" /> Block:{" "}
                  <span className="font-semibold">{apt.block}</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <FaMoneyBillWave className="text-primary" /> Rent:{" "}
                  <span className="font-bold text-green-600">৳{apt.rent}</span>
                </p>
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleAgreement(apt)}
                    className="btn btn-outline btn-primary btn-sm"
                  >
                    Make Agreement
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500 text-lg col-span-3">
            No apartments found in this rent range.
          </p>
        )}
      </div>

      {/* pagination */}
      <div className="mt-10 flex justify-center gap-2 flex-wrap">
        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            onClick={() => setCurrentPage(n + 1)}
            className={`btn btn-sm ${
              currentPage === n + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {n + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Apartments;
