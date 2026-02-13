import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../assets/images/Beranda/Image1.png";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative pt-44 pb-32 bg-gradient-to-b from-yellow-50 to-white overflow-hidden"
    >
      {/* Background blur */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-yellow-200/40 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">

          {/* ================= TEXT ================= */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
              Membangun Generasi{" "}
              <span className="text-yellow-500">Islami</span>
              <br />
              Sejak Dini
            </h1>

            <p className="mt-8 text-gray-800 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
              Sekolah pertama berbasis Islamic Montessori di Kota Sorong.
              Membentuk karakter anak yang Sholeh, Cerdas, dan Mandiri melalui
              pendidikan berkualitas berbasis nilai-nilai Al-Qur'an dan Sunnah
              dalam lingkungan yang ceria.
            </p>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap gap-6 text-sm sm:text-base text-gray-700 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">✔</span> Kurikulum Islami
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">✔</span> Guru Bersertifikat
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">✔</span> Lingkungan Aman
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/pendaftaran" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 active:scale-95 transition-all duration-150 text-white font-semibold px-8 py-4 rounded-xl shadow-md text-base">
                  Daftar Sekarang
                </button>
              </Link>

              <button className="w-full sm:w-auto bg-white hover:bg-gray-50 active:scale-95 transition-all duration-150 text-gray-800 font-semibold px-8 py-4 rounded-xl border-2 border-gray-300 text-base">
                Lihat Brosur
              </button>
            </div>

            {/* Mini Stats */}
            <div className="mt-8 grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-3xl font-bold text-yellow-500">5+</p>
                <p className="text-sm text-gray-600">Tahun Pengalaman</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-500">120+</p>
                <p className="text-sm text-gray-600">Siswa Aktif</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-500">98%</p>
                <p className="text-sm text-gray-600">Orang Tua Puas</p>
              </div>
            </div>
          </div>

          {/* ================= IMAGE ================= */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-200/30 blur-2xl rounded-3xl"></div>

              <img
                src={HeroImage}
                alt="Ilustrasi Kegiatan Belajar Anak"
                className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>

        </div> {/* flex wrapper */}
      </div> {/* container */}
    </section>
  );
}
