import React from "react";
import { motion } from "framer-motion";

// Assets
import Nilai from "../assets/Tentang/Masjid.svg";
import Kurikulum from "../assets/Tentang/Tokum.svg";
import Aman from "../assets/Tentang/Defense.svg";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Nilai,
      title: "Nilai-Nilai Islami",
      description:
        "Pendidikan karakter berlandaskan Al-Qur'an dan Sunnah sebagai fondasi akhlak dan pola pikir anak sejak dini.",
    },
    {
      icon: Kurikulum,
      title: "Kurikulum Modern",
      description:
        "Metode Montessori yang mengembangkan kreativitas, kognitif, dan kemandirian anak secara seimbang.",
    },
    {
      icon: Aman,
      title: "Lingkungan Aman",
      description:
        "Fasilitas ramah anak, bersih, nyaman, serta terpantau CCTV untuk ketenangan orang tua.",
    },
  ];

  return (
    <section
      id="tentang"
      className="relative py-24 bg-gradient-to-b from-white to-yellow-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= TITLE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-yellow-600 bg-yellow-100 rounded-full">
            Keunggulan Kami
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Kenapa Memilih <br className="hidden sm:block" />
            Khadijah Islamic Preschool?
          </h2>

          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 mb-8 rounded-full" />

          <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Kami menghadirkan pendidikan usia dini yang menggabungkan
            kurikulum modern dengan pembiasaan adab Islami untuk mendukung
            tumbuh kembang optimal buah hati Anda.
          </p>
        </motion.div>

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="
                bg-white rounded-2xl p-8
                border border-gray-100 shadow-sm
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300
              "
            >
              {/* ICON */}
              <div className="
                w-16 h-16 mb-6 rounded-xl
                bg-yellow-100 flex items-center justify-center
              ">
                <img
                  src={reason.icon}
                  alt={reason.title}
                  className="w-8 h-8"
                />
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {reason.title}
              </h3>

              {/* DESC */}
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ================= CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-600 mb-6">
            Ingin mengetahui lebih lanjut tentang program dan metode pembelajaran kami?
          </p>

          <a
            href="#program"
            className="
              inline-block bg-yellow-500 hover:bg-yellow-600
              text-white px-10 py-3 rounded-xl
              font-semibold shadow-md transition
            "
          >
            Lihat Program Pendidikan
          </a>
        </motion.div>

      </div>
    </section>
  );
}
