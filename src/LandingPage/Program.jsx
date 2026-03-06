import React, { useState, useEffect } from "react";
import Pendidikan from "../assets/Pendaftarann/Toga.svg";
import { api } from "../service/api";

export default function Program() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const phoneNumber = "6282220009850";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.getProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendWhatsApp = (program) => {
    const message = `
Assalamu’alaikum Warahmatullahi Wabarakatuh 😊

Perkenalkan, saya ingin berkonsultasi mengenai program:
📘 ${program}

Mohon informasi lebih lanjut.

Wassalamu’alaikum Warahmatullahi Wabarakatuh
`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const corePrograms = [
    "Aqidah & Morality Learning",
    "Daily Prayers",
    "Short Surah (Juz 30)",
    "Dhuha & Hadits",
    "Asmaul Husna",
    "Sirah Nabawiyah",
    "Montessori Curriculum",
  ];

  const additionalPrograms = [
    "Reading & Writing",
    "Market Day",
    "Parenting",
    "Parent Teaching Day",
    "Outdoor Learning",
    "Practical Life Skill",
  ];

  const extracurriculars = ["Art", "English", "Arabic", "Drumband"];

  return (
    <section id="program" className="bg-[#FAFAFA] py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <div className="max-w-xl mb-12 sm:mb-16">
          <span className="inline-block text-xs sm:text-sm font-semibold text-yellow-600 bg-yellow-100 px-4 py-1 rounded-full mb-4">
            Program Pendidikan
          </span>
          <h2 className="text-4xl font-bold text-gray-900 leading-snug">
            Pendidikan Islami yang
            <br />
            Terstruktur & Berkarakter
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-600">
            Kurikulum terpadu untuk membentuk anak sholeh, cerdas, dan mandiri
            sejak usia dini.
          </p>
        </div>

        {/* ================= PROGRAM VALUE ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 sm:mb-24">
          <ProgramBox title="Program Inti" items={corePrograms} />
          <ProgramBox title="Program Tambahan" items={additionalPrograms} />
          <ProgramBox title="Ekstrakurikuler" items={extracurriculars} />
        </div>

        {/* ================= PROGRAM CARDS ================= */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">Belum ada program tersedia</p>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 gap-14 ${
              products.length === 1
                ? "lg:max-w-2xl lg:mx-auto"
                : products.length === 2
                  ? "lg:grid-cols-2"
                  : "lg:grid-cols-3"
            }`}
          >
            {products.map((product) => (
              <ProgramCard
                key={product.id}
                image={product.url}
                title={product.product_name}
                desc={product.description}
                onClick={() => sendWhatsApp(product.product_name)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ================= SUB COMPONENTS ================= */

const ProgramBox = ({ title, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center font-bold text-base sm:text-lg"
      >
        {title}
        <span>{open ? "−" : "+"}</span>
      </button>

      <ul
        className={`mt-4 space-y-2 text-sm text-gray-600 ${open ? "block" : "hidden md:block"}`}
      >
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-yellow-500">✔</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProgramCard = ({ image, title, desc, onClick }) => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition">
    <div
      className="bg-[#FFF4E8] flex items-center justify-center overflow-hidden"
      style={{ aspectRatio: "4/3" }}
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
          }}
        />
      ) : (
        <div className="text-gray-400 text-center">
          <svg
            className="w-20 h-20 mx-auto mb-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm">No Image</p>
        </div>
      )}
    </div>
    <div className="p-10">
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">
        {desc || "Program pendidikan Islami berkualitas"}
      </p>
      <button
        onClick={onClick}
        className="
          w-full sm:w-auto
          bg-yellow-500 text-white
          py-3 px-6 rounded-xl
          font-semibold text-sm sm:text-base
          hover:bg-yellow-600 transition
        "
      >
        Konsultasi Program →
      </button>
    </div>
  </div>
);
