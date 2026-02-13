import React from "react";
import { useLocation } from "react-router-dom";

export default function PaymentPage() {
  const { state } = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Pembayaran</h2>

        <p className="text-gray-600 mb-2">
          Nama Orang Tua: <b>{state?.parentName}</b>
        </p>
        <p className="text-gray-600 mb-2">
          Nama Anak: <b>{state?.childName}</b>
        </p>
        <p className="text-gray-600 mb-6">
          WhatsApp: <b>{state?.whatsapp}</b>
        </p>

        <button className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold">
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
}
