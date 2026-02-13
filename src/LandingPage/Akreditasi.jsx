import AkreditasiImg from "../assets/images/Akreditasi.jpeg";
import { motion } from "framer-motion";

export default function Akreditasi() {
  return (
    <section
      className="
        relative
        min-h-screen lg:min-h-[80vh]
        flex items-center
        py-16 sm:py-20 lg:py-28
        bg-gradient-to-b
        from-white
        to-yellow-50
        overflow-hidden
      "
    >

      {/* Soft Glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[450px] lg:h-[600px] bg-yellow-400/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-5">
            Pengakuan Resmi Nasional
          </span>

          <h2 className="
            text-2xl sm:text-3xl lg:text-4xl
            font-bold text-gray-900
            leading-tight mb-5
          ">
            Alhamdulillah,
            <br />
            Khadijah Islamic Preschool
            <br />
            Terakreditasi <span className="text-yellow-500">A</span>
          </h2>

          <p className="
            text-gray-600
            text-sm sm:text-base
            leading-relaxed
            mb-5
            max-w-md
            mx-auto md:mx-0
          ">
            Khadijah Islamic Preschool telah memperoleh predikat 
            <strong> Akreditasi A </strong>
            berdasarkan keputusan Ketua Badan Akreditasi Nasional 
            Pendidikan Anak Usia Dini, Pendidikan Dasar, dan 
            Pendidikan Menengah.
          </p>

          <p className="text-xs sm:text-sm text-gray-500 font-medium">
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
          <div className="
            bg-white
            p-4 sm:p-6
            rounded-3xl
            shadow-xl
            hover:shadow-2xl
            transition duration-500
          ">
            <img
              src={AkreditasiImg}
              alt="Akreditasi A Khadijah Islamic Preschool"
              className="
                w-56 sm:w-64 md:w-72 lg:w-80
                rounded-xl
              "
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
