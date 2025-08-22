import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

// Custom marker icon (optional)
const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
});

const ApartmentLocation = () => {
  const position = [23.8103, 90.4125]; // Example: Dhaka

  return (
    <section className="px-4 py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-4xl font-bold text-black">Our Apartment Location</h2>
        <p className="text-gray-600 mt-2">Find our apartment on the interactive map below.</p>
      </div>

      <div className="h-[400px] w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-lg">
        <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-full w-full z-10">
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={customIcon}>
            <Popup>
              Our Apartment <br /> Near Gulshan, Dhaka.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default ApartmentLocation;
