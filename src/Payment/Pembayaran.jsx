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

    // =============================
    // 🔑 PAYLOAD UTAMA
    // =============================
    const payload = {
      parent_name: state?.parentName,   // Mujiasri
      email: state?.email,              // email ortu
      phone: state?.whatsapp,           // WA
      address: state?.address,          // alamat
      child_name: state?.childName,     // Ardika Rahmad Septian
      level: state?.level,              // Playgroup
      total,
    };

    // ❌ VALIDASI
    for (const key in payload) {
      if (!payload[key]) {
        alert(`Data ${key} kosong`);
        return;
      }
    }

    try {
      setLoading(true);

      // 1️⃣ MINTA TOKEN MIDTRANS
      const res = await fetch("http://localhost:5000/api/midtrans/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.token) {
        alert("Token Midtrans gagal dibuat");
        return;
      }

      // 2️⃣ TAMPILKAN SNAP
      window.snap.pay(data.token, {
        // =============================
        // ✅ SUCCESS → KIRIM EMAIL
        // =============================
        onSuccess: async () => {
          await fetch("http://localhost:5000/api/payment/success", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

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
    <section className="min-h-screen bg-[#FFF9F1] px-4">
      {/* ===== STEPPER ===== */}
      <div className="pt-16 pb-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <StepperTop icon={IsiDataStep} label="Isi Data" status="done" />
          <Divider active />
          <StepperTop icon={PembayaranStep} label="Pembayaran" status="active" />
          <Divider />
          <StepperTop icon={SelesaiStep} label="Selesai" status="inactive" />
        </div>
      </div>

      {/* ===== CARD ===== */}
      <div className="flex justify-center pb-24">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-yellow-500 px-5 py-4 text-white flex justify-between">
            <div>
              <h3 className="font-semibold text-sm">Pilih Pembayaran</h3>
              <p className="text-xs opacity-90">Khadijah Islamic Preschool</p>
            </div>
            <div className="text-right">
              <p className="text-xs">Total</p>
              <p className="font-bold">
                Rp {total.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          <div className="p-5">
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

            <button
              disabled={!selectedMethod || loading}
              onClick={handlePayment}
              className={`mt-6 w-full py-4 rounded-xl font-semibold text-sm
                ${
                  selectedMethod
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
            >
              {loading ? "Memproses..." : "Bayar Sekarang"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= COMPONENTS ================= */

function StepperTop({ icon, label, status }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        status === "inactive" ? "bg-gray-200" : "bg-yellow-500"
      }`}>
        <img src={icon} alt={label} className="w-4 brightness-0 invert" />
      </div>
      <span className="text-[10px] font-semibold">{label}</span>
    </div>
  );
}

function Divider({ active }) {
  return (
    <div className={`flex-1 h-[2px] mx-1 ${
      active ? "bg-yellow-400" : "bg-gray-300"
    }`} />
  );
}

function Method({ icon, title, desc, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer
        ${active ? "border-yellow-500 bg-yellow-50" : "hover:bg-gray-50"}`}
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
