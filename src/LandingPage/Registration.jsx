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

    //  KIRIM DATA KE FORMULIR PENDAFTARAN SISWA
    navigate("/pendaftaran", {
      state: {
        parentName: formData.parentName,
        childName: formData.childName,
        whatsapp: formData.whatsapp,
      },
    });
  };

  return (
    <section id="pendaftaran" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Pendaftaran Online <br />
            Mudah & Cepat
          </h2>

          <p className="text-gray-600 text-lg mb-10 max-w-xl leading-relaxed">
            Orang tua dapat melakukan pendaftaran dan pembayaran biaya pendidikan
            secara online melalui sistem yang aman, cepat, dan terintegrasi.
          </p>

          {/* Steps */}
          <div className="space-y-6">
            {[
              "Isi formulir pendaftaran digital",
              "Bayar biaya registrasi via Midtrans",
              "Konfirmasi otomatis & verifikasi data",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <p className="text-gray-700 text-base">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT FORM ================= */}
        <div className="bg-[#FFF7ED] rounded-3xl shadow-xl p-8 md:p-10">

          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">📋</span>
            <h3 className="text-xl font-bold text-gray-900">
              Mulai Pendaftaran
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

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
              className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600
                         active:scale-[0.98] transition-all
                         text-white font-semibold py-3 rounded-xl shadow-md"
            >
              Daftar & Lanjut Pembayaran
            </button>

            <p className="text-xs text-center text-gray-500 mt-4">
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
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        {...props}
        required
        className="w-full px-4 py-3 rounded-lg border border-gray-300
                   focus:ring-2 focus:ring-yellow-400 outline-none bg-white"
      />
    </div>
  );
}
