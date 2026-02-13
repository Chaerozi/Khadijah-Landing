import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    whatsapp: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/pendaftaran", {
      state: {
        parentName: formData.parentName,
        childName: formData.childName,
        whatsapp: formData.whatsapp,
      },
    });
  };

  return (
    <section
      id="pendaftaran"
      className="
        py-16 sm:py-20 lg:py-28
        bg-white
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <div className="text-center lg:text-left">

          <h2 className="
            text-2xl sm:text-3xl lg:text-4xl xl:text-5xl
            font-bold text-gray-900
            leading-tight mb-5
          ">
            Pendaftaran Online
            <br />
            Mudah & Cepat
          </h2>

          <p className="
            text-gray-600
            text-sm sm:text-base lg:text-lg
            mb-8
            max-w-lg
            mx-auto lg:mx-0
            leading-relaxed
          ">
            Orang tua dapat melakukan pendaftaran dan pembayaran
            biaya pendidikan secara online melalui sistem yang
            aman, cepat, dan terintegrasi.
          </p>

          {/* Steps */}
          <div className="space-y-5 max-w-md mx-auto lg:mx-0">
            {[
              "Isi formulir pendaftaran digital",
              "Bayar biaya registrasi via Midtrans",
              "Konfirmasi otomatis & verifikasi data",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4 text-left">
                <div className="
                  w-8 h-8
                  rounded-full
                  bg-yellow-500
                  text-white
                  flex items-center justify-center
                  font-semibold text-sm
                  shrink-0
                ">
                  {i + 1}
                </div>
                <p className="text-gray-700 text-sm sm:text-base">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT FORM ================= */}
        <div className="
          bg-[#FFF7ED]
          rounded-3xl
          shadow-xl
          p-6 sm:p-8 md:p-10
        ">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl">📋</span>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Mulai Pendaftaran
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              label="Nama Lengkap Orang Tua"
              name="parentName"
              placeholder="Contoh: Rhisky Ahmad"
              value={formData.parentName}
              onChange={handleChange}
            />

            <Input
              label="Nama Lengkap Anak"
              name="childName"
              placeholder="Contoh: Irfanda Putra"
              value={formData.childName}
              onChange={handleChange}
            />

            <Input
              label="Nomor WhatsApp Aktif"
              name="whatsapp"
              placeholder="08xxxxxxxxxx"
              value={formData.whatsapp}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="
                w-full
                bg-yellow-500 hover:bg-yellow-600
                active:scale-[0.98]
                transition-all
                text-white
                font-semibold
                py-3
                rounded-xl
                shadow-md
                text-sm sm:text-base
              "
            >
              Daftar & Lanjut Pembayaran
            </button>

            <p className="text-xs text-center text-gray-500 mt-3">
              Dengan mendaftar, Anda menyetujui kebijakan privasi kami
            </p>
          </form>
        </div>

      </div>
    </section>
  );
}

/* ================= INPUT COMPONENT ================= */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="
        block
        text-xs sm:text-sm
        font-semibold
        text-gray-700
        mb-2
      ">
        {label}
      </label>

      <input
        {...props}
        required
        className="
          w-full
          px-4 py-3
          rounded-lg
          border border-gray-300
          focus:ring-2 focus:ring-yellow-400
          outline-none
          bg-white
          text-sm sm:text-base
        "
      />
    </div>
  );
}
