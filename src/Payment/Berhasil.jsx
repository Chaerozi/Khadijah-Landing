import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Berhasil() {
  const navigate = useNavigate();

  // ⏱️ Auto redirect ke Beranda (opsional)
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 12000); // 12 detik

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="min-h-screen bg-[#FFF9F1] flex items-center justify-center px-4">
      <div
        className="
          w-full max-w-md bg-white rounded-3xl
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          px-8 py-10 text-center
          animate-fadeIn
        "
      >
        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-yellow-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
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
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Pendaftaran Berhasil
        </h1>

        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Terima kasih telah mempercayakan pendidikan Ananda kepada
          <span className="font-semibold text-gray-800">
            {" "}
            Khadijah Islamic Preschool
          </span>
          .  
          Data pendaftaran dan pembayaran Anda telah kami terima dengan baik.
        </p>

        {/* INFO BOX */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-left text-sm text-gray-700 mb-6 space-y-2">
          <div className="flex gap-2">
            <span>📞</span>
            <span>
              Tim kami akan menghubungi Anda melalui WhatsApp untuk proses
              selanjutnya.
            </span>
          </div>
          <div className="flex gap-2">
            <span>⏳</span>
            <span>
              Mohon menunggu konfirmasi maksimal{" "}
              <b>1×24 jam kerja</b>.
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/")}
            className="
              flex-1 bg-yellow-500 hover:bg-yellow-600
              text-white py-3 rounded-xl
              font-semibold transition shadow-md
            "
          >
            Kembali ke Beranda
          </button>

          <a
            href="https://wa.me/6282220009850"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex-1 border border-yellow-400
              text-yellow-600 hover:bg-yellow-50
              py-3 rounded-xl font-semibold
              transition text-center
            "
          >
            Hubungi Admin
          </a>
        </div>

        {/* FOOT NOTE */}
        <p className="text-xs text-gray-400 mt-6">
          Anda akan diarahkan ke beranda secara otomatis dalam beberapa detik.
        </p>
      </div>
    </section>
  );
}
