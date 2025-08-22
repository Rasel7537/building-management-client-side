import { motion } from "framer-motion";
import { FaCouch, FaWifi, FaShieldAlt, FaWater } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: "spring",
    },
  }),
};

const AboutTheBuilding = () => {
  return (
    <motion.section
      className="px-4 py-12 bg-gray-50 text-gray-800"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-black-700 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          About the Building
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Discover a place you'll love to live! Our building combines comfort,
          convenience, and security in one location. Experience modern
          amenities, elegant design, and a peaceful environment — perfect for
          families and professionals alike.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <FaCouch className="text-black" />,
              title: "Fully Furnished",
              desc: "All apartments come with modern furniture, stylish decor, and essential appliances.",
            },
            {
              icon: <FaWifi className="text-black" />,
              title: "High-Speed Internet",
              desc: "Enjoy uninterrupted internet access across the entire building, 24/7.",
            },
            {
              icon: <FaShieldAlt className="text-black" />,
              title: "Secure Environment",
              desc: "24/7 security monitoring and restricted access ensure your peace of mind.",
            },
            {
              icon: <FaWater className="text-black" />,
              title: "Modern Utilities",
              desc: "Reliable water, electricity, and waste systems for a hassle-free lifestyle.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="text-4xl text-blue-600 mb-4 mx-auto text-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutTheBuilding;
