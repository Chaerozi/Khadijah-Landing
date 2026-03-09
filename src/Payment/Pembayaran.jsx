import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationStore } from "../store/registrationStore";
import { api } from "../service/api";

import IsiDataStep from "../assets/Pendaftarann/isidata.svg";
import PembayaranStep from "../assets/images/Payement/Wallet.svg";
import SelesaiStep from "../assets/Pendaftarann/Selesai.svg";

export default function Pembayaran() {
  const navigate = useNavigate();

  // Get data dari Zustand
  const { registrationData, registrationId, productInfo } =
    useRegistrationStore();

  const [productPrice, setProductPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [lastClickTime, setLastClickTime] = useState(0);

  // Debug: Log Zustand data when component mounts
  useEffect(() => {
    console.log("=== PEMBAYARAN PAGE DEBUG ===");
    console.log("registrationId:", registrationId);
    console.log("registrationData:", registrationData);
    console.log("productInfo:", productInfo);
  }, []);

  // Fetch product price from backend
  useEffect(() => {
    const fetchProductPrice = async () => {
      if (!productInfo?.productId) {
        alert(
          "Data produk tidak ditemukan. Silakan isi form pendaftaran terlebih dahulu.",
        );
        navigate("/pendaftaran");
        return;
      }

      try {
        setLoadingPrice(true);
        const result = await api.getProductById(productInfo.productId);

        if (result.success && result.data) {
          setProductPrice(result.data.set_price);
        } else {
          throw new Error("Failed to fetch product price");
        }
      } catch (error) {
        console.error("Error fetching product price:", error);
        alert("Gagal mengambil harga produk");
      } finally {
        setLoadingPrice(false);
      }
    };

    fetchProductPrice();
  }, [productInfo, navigate]);

  const handlePayment = async () => {
    // 🔒 Prevent multiple clicks
    if (loading) {
      console.log("Payment already in progress, ignoring click");
      return;
    }

    // 🔒 Debounce: Prevent rapid clicks (< 2 seconds)
    const now = Date.now();
    if (now - lastClickTime < 2000) {
      console.log("Too fast! Please wait before clicking again.");
      return;
    }
    setLastClickTime(now);

    if (!window.snap) {
      alert("Midtrans Snap belum siap. Pastikan script Midtrans sudah dimuat.");
      return;
    }

    // Validasi data registrasi
    if (!registrationId || !registrationData.parentName) {
      console.error("Payment validation failed:");
      console.error("registrationId:", registrationId);
      console.error("registrationData:", registrationData);
      alert(
        "Data registrasi tidak lengkap. Silakan isi form pendaftaran terlebih dahulu.",
      );
      navigate("/pendaftaran");
      return;
    }

    // Payload untuk payment
    const payload = {
      registration_id: registrationId,
      parent_name: registrationData.parentName,
      email: registrationData.email,
      phone: registrationData.whatsapp, // ✅ FIX: phone dari whatsapp
      address: registrationData.address,
      child_name: registrationData.childName,
      level: registrationData.level,
      total: productPrice,
    };

    // Validasi payload
    for (const key in payload) {
      if (!payload[key] && key !== "registration_id") {
        console.error(`Validation failed: ${key} is empty`);
        console.error("Full payload:", payload);
        alert(`Data ${key} kosong. Silakan lengkapi form pendaftaran.`);
        return;
      }
    }

    try {
      setLoading(true);

      // Request token Midtrans dari backend
      const data = await api.createPaymentToken(payload);
      console.log("Payment response:", data);

      if (!data.success) {
        // Show real Midtrans error if available
        const errorDetail = data.errors?.error ? `\n\nDetail: ${data.errors.error}` : "";
        alert((data.message || "Token Midtrans gagal dibuat") + errorDetail);
        setLoading(false);
        return;
      }

      if (!data.data?.token) {
        console.error("No token in response:", data);
        alert("Token tidak ditemukan dalam response");
        setLoading(false);
        return;
      }

      // Check if Midtrans Snap is loaded
      if (!window.snap) {
        alert("Midtrans Snap belum loaded. Silakan refresh halaman.");
        setLoading(false);
        return;
      }

      console.log("Opening Midtrans Snap with token:", data.data.token);

      const invoiceId = data.data.invoice_id;

      // Track if payment was completed (success/pending) to handle onClose correctly
      let paymentCompleted = false;

      // Tampilkan Snap popup
      window.snap.pay(data.data.token, {
        onSuccess: (result) => {
          // ✅ Pembayaran BERHASIL
          console.log("Payment success:", result);
          paymentCompleted = true;

          // Navigate immediately — don't block on backend update
          setLoading(false);
          navigate("/pendaftaran/berhasil");

          // Fire backend update in background (webhook will already handle this on production)
          api.updatePaymentStatus({
            invoice_id: invoiceId,
            transaction_id: result.transaction_id,
            transaction_status: result.transaction_status,
            payment_type: result.payment_type,
          }).catch((err) => console.error("Background status update failed:", err));
        },
        onPending: async (result) => {
          // ⏳ Pembayaran PENDING (bank transfer, dll)
          console.log("Payment pending:", result);
          paymentCompleted = true;

          try {
            // Update payment status ke pending
            await api.updatePaymentStatus({
              invoice_id: invoiceId,
              transaction_id: result.transaction_id,
              transaction_status: "pending",
              payment_type: result.payment_type,
            });
          } catch (updateError) {
            console.error("Failed to update payment status:", updateError);
          }

          setLoading(false);
          alert(
            "Pembayaran Anda sedang diproses. Silakan selesaikan pembayaran dan tunggu konfirmasi dari admin.",
          );
        },
        onError: async (error) => {
          // ❌ Pembayaran GAGAL
          console.error("Payment error:", error);

          try {
            // Update payment status ke failed
            await api.updatePaymentStatus({
              invoice_id: invoiceId,
              transaction_id: error.transaction_id || null,
              transaction_status: "deny",
              payment_type: error.payment_type || null,
            });
          } catch (updateError) {
            console.error("Failed to update payment status:", updateError);
          }

          setLoading(false);
          alert("Pembayaran gagal. Silakan coba lagi.");
        },
        onClose: async () => {
          // If payment was already confirmed by onSuccess/onPending callback, navigate immediately
          if (paymentCompleted) {
            navigate("/pendaftaran/berhasil");
            return;
          }

          // Fallback: verify with backend in case Midtrans closed without firing onSuccess
          // (can happen on production with certain payment methods)
          try {
            const statusResult = await api.getPaymentStatus(registrationId);
            if (statusResult?.data?.state === "success" || statusResult?.data?.state === "pending") {
              navigate("/pendaftaran/berhasil");
              return;
            }
          } catch (e) {
            // Ignore status check errors — user stays on payment page
          }

          // User closed popup without paying
          console.log("Payment popup ditutup oleh user");
          setLoading(false);
        },
      });
    } catch (err) {
      console.error("Payment error:", err);
      alert(err.message || "Terjadi kesalahan saat memproses pembayaran.");
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
          <StepperTop
            icon={PembayaranStep}
            label="Pembayaran"
            status="active"
          />
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
              {loadingPrice ? (
                <p className="font-bold text-sm">Loading...</p>
              ) : (
                <p className="font-bold">
                  Rp {productPrice.toLocaleString("id-ID")}
                </p>
              )}
            </div>
          </div>

          <div className="p-5">
            {/* Info Pendaftaran */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg text-sm space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Nama Anak:</span>{" "}
                {registrationData.childName}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Jenjang:</span>{" "}
                {registrationData.level}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Orang Tua:</span>{" "}
                {registrationData.parentName}
              </p>
            </div>

            {/* Payment Info */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
              <p className="text-blue-800 mb-2">
                <strong>ℹ️ Metode Pembayaran</strong>
              </p>
              <p className="text-blue-700 text-xs leading-relaxed">
                Anda dapat memilih metode pembayaran setelah klik tombol di
                bawah:
              </p>
              <ul className="mt-2 text-xs text-blue-600 space-y-1">
                <li>• QRIS (GoPay, DANA, ShopeePay)</li>
                <li>• Virtual Account (BCA, BNI, Mandiri)</li>
                <li>• Kartu Kredit/Debit</li>
                <li>• E-Wallet lainnya</li>
              </ul>
            </div>

            {/* BUTTON */}
            <button
              disabled={loading || loadingPrice}
              onClick={handlePayment}
              className={`w-full py-4 rounded-xl font-semibold text-sm transition-all
                ${
                  loading || loadingPrice
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl active:scale-[0.98]"
                }`}
            >
              {loading ? "Memproses..." : "Bayar Sekarang"}
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              Transaksi dijamin aman dengan enkripsi SSL
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
