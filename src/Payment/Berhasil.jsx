import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ===== STEPPER ICONS =====
import IsiDataStep from "../assets/Pendaftarann/isidata.svg";
import PembayaranStep from "../assets/images/Payement/Wallet.svg";
import SelesaiStep from "../assets/Pendaftarann/Selesai.svg";

export default function Berhasil() {
  const navigate = useNavigate();

  // ⏱️ Auto redirect ke Beranda
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 12000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF6E8] via-[#FFF9F1] to-[#FFFDF8] px-4">

      {/* ===== STEPPER (ATAS) ===== */}
      <div className="pt-16 pb-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <StepperTop icon={IsiDataStep} label="Isi Data" status="done" />
          <Divider active />
          <StepperTop icon={PembayaranStep} label="Pembayaran" status="done" />
          <Divider active />
          <StepperTop icon={SelesaiStep} label="Selesai" status="active" />
        </div>
      </div>

      {/* ===== CARD SUCCESS ===== */}
      <div className="flex justify-center pb-24">
        <div
          className="
            w-full max-w-md bg-white
            rounded-[28px]
            shadow-[0_25px_70px_rgba(0,0,0,0.10)]
            px-7 py-9 text-center
            animate-fadeIn
          "
        >
          {/* SUCCESS ICON */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4"
                  />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-white text-[11px] px-3 py-1 rounded-full shadow">
                Berhasil
              </span>
            </div>
          </div>

          {/* TITLE */}
          <h1 className="text-[22px] sm:text-2xl font-bold text-gray-900 mb-2">
            Pendaftaran Berhasil 🎉
          </h1>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Terima kasih telah mempercayakan pendidikan Ananda kepada
            <span className="font-semibold text-gray-800">
              {" "}
              Khadijah Islamic Preschool
            </span>
            .
            <br />
            <span className="text-gray-500">
              Data pendaftaran & pembayaran telah kami terima.
            </span>
          </p>

          {/* INFO BOX */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-left text-sm text-gray-700 mb-6 space-y-3">
            <div className="flex gap-3 items-start">
              <span className="text-lg">📞</span>
              <span>
                Tim admin akan menghubungi Anda melalui
                <b className="text-gray-800"> WhatsApp</b>.
              </span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-lg">⏳</span>
              <span>
                Estimasi konfirmasi maksimal{" "}
                <b className="text-gray-800">1×24 jam kerja</b>.
              </span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/")}
              className="
                w-full bg-yellow-500 hover:bg-yellow-600
                text-white py-3 rounded-xl
                font-semibold transition
                shadow-md active:scale-[0.98]
              "
            >
              Kembali ke Beranda
            </button>

            <a
              href="https://wa.me/6282220009850"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full border border-yellow-400
                text-yellow-600 hover:bg-yellow-50
                py-3 rounded-xl font-semibold
                transition text-center
                active:scale-[0.98]
              "
            >
              Hubungi Admin
            </a>
          </div>

          {/* FOOT NOTE */}
          <p className="text-[11px] text-gray-400 mt-6">
            Anda akan diarahkan otomatis ke beranda dalam beberapa detik.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================= STEPPER COMPONENTS ================= */

function StepperTop({ icon, label, status }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          status === "active"
            ? "bg-yellow-500"
            : status === "done"
            ? "bg-yellow-400"
            : "bg-gray-200"
        }`}
      >
        <img src={icon} alt={label} className="w-4 brightness-0 invert" />
      </div>
      <span className="text-[10px] font-semibold text-gray-700">
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
