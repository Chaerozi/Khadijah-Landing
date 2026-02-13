import AkreditasiImg from "../assets/images/Akreditasi.jpeg";
import { motion } from "framer-motion";

export default function Akreditasi() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-white to-yellow-50 overflow-hidden">

      {/* Soft Glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-yellow-400/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full text-sm font-semibold mb-6">
            Pengakuan Resmi Nasional
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            Alhamdulillah,
            <br />
            Khadijah Islamic Preschool
            <br />
            Terakreditasi <span className="text-yellow-500">A</span>
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Khadijah Islamic Preschool telah memperoleh predikat 
            <strong> Akreditasi A </strong>
            berdasarkan keputusan Ketua Badan Akreditasi Nasional 
            Pendidikan Anak Usia Dini, Pendidikan Dasar, dan 
            Pendidikan Menengah.
          </p>

          <p className="text-sm text-gray-500 font-medium">
            Nomor: 402/BAN-PDM/SK/2025
          </p>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500">
            <img
              src={AkreditasiImg}
              alt="Akreditasi A Khadijah Islamic Preschool"
              className="w-72 md:w-80 rounded-xl"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
