import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Data tidak ditemukan.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-16 px-4 flex items-center">
      <div className="max-w-md mx-auto w-full">

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              💳
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Konfirmasi Pembayaran
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Pastikan data berikut sudah benar sebelum melanjutkan pembayaran
            </p>
          </div>

          {/* DATA */}
          <div className="space-y-4 mb-8 text-sm sm:text-base">
            <DataRow label="Nama Orang Tua" value={state.parentName} />
            <DataRow label="Nama Anak" value={state.childName} />
            <DataRow label="WhatsApp" value={state.whatsapp} />
          </div>

          {/* BIAYA */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">
                Biaya Registrasi
              </span>
              <span className="font-bold text-yellow-600">
                Rp 500.000
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <button
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
            "
          >
            Bayar Sekarang
          </button>

          <p className="text-xs text-center text-gray-500 mt-5">
            Pembayaran diproses melalui sistem aman & terenkripsi
          </p>
        </div>

      </div>
    </section>
  );
}

/* ================= SUB COMPONENT ================= */

function DataRow({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}
