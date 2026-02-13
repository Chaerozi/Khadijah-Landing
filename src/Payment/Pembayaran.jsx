import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ===== STEPPER ICONS =====
import IsiDataStep from "../assets/Pendaftarann/isidata.svg";
import PembayaranStep from "../assets/images/Payement/Wallet.svg";
import SelesaiStep from "../assets/Pendaftarann/Selesai.svg";

// ===== METODE ICONS =====
import VirtualIcon from "../assets/Pembayarann/Virtual.svg";
import KreditIcon from "../assets/Pembayarann/Kredit.svg";
import QrisIcon from "../assets/Pembayarann/QR.svg";

export default function Pembayaran() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const total = 200000;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!window.snap) {
      alert("Midtrans Snap belum siap");
      return;
    }

    const payload = {
      parent_name: state?.parentName,
      email: state?.email,
      phone: state?.whatsapp,
      address: state?.address,
      child_name: state?.childName,
      level: state?.level,
      total,
    };

    for (const key in payload) {
      if (!payload[key]) {
        alert(`Data ${key} kosong`);
        return;
      }
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://khadijahbackendv2-production.up.railway.app/api/midtrans/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!data.token) {
        alert("Token Midtrans gagal dibuat");
        return;
      }

      window.snap.pay(data.token, {
        onSuccess: async () => {
          await fetch(
            "https://khadijahbackendv2-production.up.railway.app/api/payment/success",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );

          navigate("/pendaftaran/berhasil");
        },
        onPending: (r) => console.log("PENDING:", r),
        onError: (e) => console.error("ERROR:", e),
      });
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan pembayaran");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-yellow-50 to-white px-4 py-10">

      {/* ===== STEPPER ===== */}
      <div className="mt-28 max-w-md mx-auto mb-10">
        <div className="flex items-center justify-between">
          <StepperTop icon={IsiDataStep} label="Isi Data" status="done" />
          <Divider active />
          <StepperTop icon={PembayaranStep} label="Pembayaran" status="active" />
          <Divider />
          <StepperTop icon={SelesaiStep} label="Selesai" status="inactive" />
        </div>
      </div>

      {/* ===== CARD ===== */}
      <div className="flex justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="bg-yellow-500 px-6 py-5 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-sm">
                  Konfirmasi Pembayaran
                </h3>
                <p className="text-xs opacity-90">
                  Khadijah Islamic Preschool
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs">Total</p>
                <p className="font-bold text-lg">
                  Rp {total.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="p-6">

            {/* DATA SUMMARY */}
            <div className="bg-yellow-50 rounded-xl p-4 mb-6 text-xs space-y-2">
              <DataRow label="Orang Tua" value={state?.parentName} />
              <DataRow label="Ananda" value={state?.childName} />
              <DataRow label="Jenjang" value={state?.level} />
            </div>

            {/* PAYMENT METHODS */}
            <div className="space-y-3">
              <Method
                icon={QrisIcon}
                title="QRIS"
                desc="Gopay, Dana, ShopeePay"
                active={selectedMethod === "qris"}
                onClick={() => setSelectedMethod("qris")}
              />

              <Method
                icon={VirtualIcon}
                title="Virtual Account"
                desc="BCA, BNI, Mandiri"
                active={selectedMethod === "va"}
                onClick={() => setSelectedMethod("va")}
              />

              <Method
                icon={KreditIcon}
                title="Kartu Kredit"
                desc="Visa, Mastercard"
                active={selectedMethod === "cc"}
                onClick={() => setSelectedMethod("cc")}
              />
            </div>

            {/* BUTTON */}
            <button
              disabled={!selectedMethod || loading}
              onClick={handlePayment}
              className={`mt-6 w-full py-4 rounded-xl font-semibold text-sm transition
                ${
                  selectedMethod
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
            >
              {loading ? "Memproses..." : "Bayar Sekarang"}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              Pembayaran aman & terenkripsi oleh Midtrans
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= COMPONENTS ================= */

function StepperTop({ icon, label, status }) {
  return (
    <div className="flex flex-col items-center gap-1 text-[10px]">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          status === "inactive" ? "bg-gray-200" : "bg-yellow-500"
        }`}
      >
        <img src={icon} alt={label} className="w-4 brightness-0 invert" />
      </div>
      <span
        className={`font-semibold ${
          status === "active"
            ? "text-yellow-600"
            : status === "done"
            ? "text-gray-600"
            : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function Divider({ active }) {
  return (
    <div
      className={`flex-1 h-[2px] mx-1 ${
        active ? "bg-yellow-400" : "bg-gray-300"
      }`}
    />
  );
}

function Method({ icon, title, desc, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition
        ${
          active
            ? "border-yellow-500 bg-yellow-50"
            : "border-gray-200 hover:bg-gray-50"
        }`}
    >
      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
        <img src={icon} alt={title} className="w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      {active && <span className="text-yellow-500 font-bold">✓</span>}
    </div>
  );
}

function DataRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
}
