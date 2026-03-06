import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegistrationStore } from "../store/registrationStore";
import { api } from "../service/api";

// ===== STEPPER ICONS =====
import IsiData from "../assets/Pendaftarann/isidata.svg";
import Pembayaran from "../assets/images/Payement/Wallet.svg";
import Selesai from "../assets/Pendaftarann/Selesai.svg";

// ===== FORM ICONS =====
import Anak from "../assets/Pendaftarann/Anak.svg";
import Pendidikan from "../assets/Pendaftarann/Toga.svg";
import Nomor from "../assets/Pendaftarann/Hp.svg";
import Alamat from "../assets/Pendaftarann/Loca.svg";
import Tanggal from "../assets/Pendaftarann/Lahir.svg";
import Wali from "../assets/Pendaftarann/Kntal.svg";
import KK from "../assets/Pendaftarann/File.svg";
import EmailIcon from "../assets/Pendaftarann/email.svg";

export default function Pendaftaran1() {
  const location = useLocation();
  const navigate = useNavigate();

  // Zustand store
  const { registrationData, setRegistrationData, setRegistrationResponse } =
    useRegistrationStore();

  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    childName: "",
    whatsapp: "",
    birthDate: "",
    level: "",
    address: "",
    kkFile: null,
    akteFile: null,
  });

  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const [kkPreview, setKkPreview] = useState(null);
  const [aktePreview, setAktePreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // ===== REGISTRATION STATUS =====
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const [academicYear, setAcademicYear] = useState("");
  const [closedMessage, setClosedMessage] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(true);

  // ===== CHECK REGISTRATION STATUS =====
  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const response = await api.getRegistrationStatus();
        setIsRegistrationOpen(response.data.isOpen);
        if (response.data.isOpen) {
          setAcademicYear(response.data.academicYear || "");
        } else {
          setClosedMessage(
            response.data.message || "Pendaftaran saat ini ditutup.",
          );
        }
      } catch (error) {
        console.error("Failed to fetch registration status:", error);
        // Default to closed if API fails
        setIsRegistrationOpen(false);
        setClosedMessage(
          "Tidak dapat memuat status pendaftaran. Silakan coba lagi nanti.",
        );
      } finally {
        setLoadingStatus(false);
      }
    };
    checkRegistrationStatus();
  }, []);

  // ===== FETCH PRODUCTS =====
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getProducts();
        setProducts(response.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // ===== AUTO POPULATE DARI ZUSTAND STORE (ON MOUNT) =====
  useEffect(() => {
    // Prioritas: landing page state > zustand store
    if (location.state) {
      setFormData((prev) => ({
        ...prev,
        parentName: location.state.parentName || registrationData.parentName,
        childName: location.state.childName || registrationData.childName,
        whatsapp: location.state.whatsapp || registrationData.whatsapp,
      }));
    } else if (registrationData.parentName) {
      // Load dari zustand jika user kembali dari payment page
      setFormData((prev) => ({
        ...prev,
        ...registrationData,
        kkFile: null, // File tidak disimpan di store
        akteFile: null,
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newErrors = { ...errors };

    if (name === "whatsapp") {
      const regex = /^[0-9]{10,15}$/;
      if (!regex.test(value)) newErrors.whatsapp = "Nomor WhatsApp tidak valid";
      else delete newErrors.whatsapp;
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) newErrors.email = "Format email tidak valid";
      else delete newErrors.email;
    }

    if (name === "kkFile" && files?.length) {
      const file = files[0];
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        newErrors[name] = "File harus JPG, PNG, atau PDF";
        setErrors(newErrors);
        return;
      }

      if (file.size > maxSize) {
        newErrors[name] = "Ukuran file maksimal 2MB";
        setErrors(newErrors);
        return;
      }

      delete newErrors[name];

      const preview = {
        url: URL.createObjectURL(file),
        type: file.type,
      };

      setKkPreview(preview);
    }

    // ================= FILE AKTE KELAHIRAN =================
    if (name === "akteFile" && files?.length) {
      const file = files[0];
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      // ❌ format salah
      if (!allowedTypes.includes(file.type)) {
        newErrors.akteFile = "File harus JPG, PNG, atau PDF";
        setErrors(newErrors);
        setFormData({ ...formData, akteFile: null });
        setAktePreview(null);
        return;
      }

      // ❌ ukuran terlalu besar
      if (file.size > maxSize) {
        newErrors.akteFile = "Ukuran file maksimal 2MB";
        setErrors(newErrors);
        setFormData({ ...formData, akteFile: null });
        setAktePreview(null);
        return;
      }

      // ✅ valid → simpan preview
      delete newErrors.akteFile;
      setAktePreview({
        url: URL.createObjectURL(file),
        type: file.type,
      });
    }

    setErrors(newErrors);
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // ===== VALIDASI FINAL =====
  useEffect(() => {
    const valid =
      formData.childName.trim() !== "" &&
      formData.birthDate !== "" &&
      formData.level !== "" &&
      formData.parentName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.whatsapp.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.kkFile !== null &&
      formData.akteFile !== null && // ⬅️ TAMBAH: AKTE REQUIRED
      !errors.whatsapp &&
      !errors.email &&
      !errors.kkFile &&
      !errors.akteFile; // ⬅️ TAMBAH: CHECK AKTE ERROR

    setCanSubmit(valid);
  }, [formData, errors]);

  // ===== SUBMIT =====
  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      // Find selected product by ID (formData.level now contains product_id)
      const selectedProduct = products.find((p) => p.id === formData.level);

      if (!selectedProduct) {
        alert(
          "Produk tidak ditemukan. Silakan pilih ulang jenjang pendidikan.",
        );
        return;
      }

      // Save text data ke Zustand (tanpa files)
      const dataToSave = {
        parentName: formData.parentName,
        email: formData.email,
        childName: formData.childName,
        whatsapp: formData.whatsapp,
        birthDate: formData.birthDate,
        level: selectedProduct.product_name, // Save product name for display
        address: formData.address,
      };
      console.log("=== SAVING TO ZUSTAND ===", dataToSave);
      setRegistrationData(dataToSave);

      const payload = new FormData();
      payload.append("fullname", formData.childName);
      payload.append("child_name", formData.childName);
      payload.append("birth_date", formData.birthDate);
      payload.append("product_id", formData.level); // formData.level contains product_id
      payload.append("parent_name", formData.parentName);
      payload.append("parent_email", formData.email);
      payload.append("whatsapp_number", formData.whatsapp);
      payload.append("address", formData.address);
      payload.append("family_card", formData.kkFile);
      payload.append("birth_certificate", formData.akteFile);

      const result = await api.createRegistration(payload);
      console.log("=== BACKEND RESPONSE ===", result);

      if (!result.success) {
        alert(result.message || "Pendaftaran gagal");
        return;
      }

      // Save registration response ke Zustand
      console.log("=== SAVING REGISTRATION RESPONSE ===");
      console.log("registration_id:", result.data.registration_id);
      console.log("productInfo:", {
        product: result.data.product,
        productId: formData.level,
      });

      setRegistrationResponse(result.data.registration_id, {
        product: result.data.product,
        productId: formData.level,
      });

      // Navigate ke halaman pembayaran
      console.log("=== NAVIGATING TO PAYMENT ===");
      navigate("/pendaftaran/pembayaran");
    } catch (err) {
      console.error("Submission error:", err);
      alert(err.message || "Terjadi kesalahan saat mengirim data. Pastikan server backend sudah berjalan.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="mt-18 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Formulir Pendaftaran
          </h1>
          {academicYear && (
            <p className="text-lg font-semibold text-[#FF8225] mt-2">
              Tahun Ajaran {academicYear}
            </p>
          )}
          <p className="text-gray-600 mt-3">
            Lengkapi seluruh data Ananda untuk melanjutkan pendaftaran.
          </p>
        </div>

        {/* LOADING STATE */}
        {loadingStatus ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8225]"></div>
          </div>
        ) : !isRegistrationOpen ? (
          /* REGISTRATION CLOSED MESSAGE */
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-20 w-20 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pendaftaran Ditutup
            </h2>
            <p className="text-gray-600 text-lg mb-8 whitespace-pre-line">
              {closedMessage}
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#FF8225] hover:bg-[#e67520] text-white font-semibold py-3 px-8 rounded-full transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        ) : (
          /* REGISTRATION FORM */
          <>
            {/* STEPPER */}
            <div className="flex justify-center items-center gap-12 mb-16">
              <Step icon={IsiData} label="Isi Data" active />
              <Line />
              <Step icon={Pembayaran} label="Pembayaran" />
              <Line />
              <Step icon={Selesai} label="Selesai" />
            </div>

            {/* FORM */}
            <div className="bg-white rounded-3xl shadow-lg p-10">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input
                  icon={Anak}
                  label="Nama Lengkap Ananda"
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                />

                <Input
                  icon={Tanggal}
                  type="date"
                  label="Tanggal Lahir"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                />

                <Select
                  icon={Pendidikan}
                  label="Jenjang Pendidikan"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  products={products}
                  loading={loadingProducts}
                />

                <Input
                  icon={Wali}
                  label="Nama Orang Tua / Wali"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                />

                {/* EMAIL (BARU) */}
                <Input
                  icon={EmailIcon}
                  label="Email Orang Tua / Wali"
                  placeholder="contoh: orangtua@gmail.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  helper="Digunakan untuk bukti pendaftaran & informasi sekolah"
                />

                <Input
                  icon={Nomor}
                  label="Nomor WhatsApp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  error={errors.whatsapp}
                  helper="Digunakan untuk konfirmasi pendaftaran"
                />

                <Upload
                  icon={KK}
                  type="file"
                  label="Upload Kartu Keluarga"
                  name="kkFile"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleChange}
                  error={errors.kkFile}
                />

                {/* 🔐 PREVIEW KK (HIDDEN - LOGIC ONLY) */}
                {kkPreview && (
                  <div className="mt-3 border rounded-lg p-3 bg-gray-50">
                    {kkPreview.type === "application/pdf" ? (
                      <div className="text-sm text-gray-600">
                        📄 File PDF siap dikirim
                      </div>
                    ) : (
                      <img
                        src={kkPreview.url}
                        alt="Preview Kartu Keluarga"
                        className="max-h-40 rounded-md border"
                      />
                    )}
                  </div>
                )}

                <Upload
                  icon={KK}
                  type="file"
                  label="Upload Akte Kelahiran"
                  name="akteFile"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleChange}
                  error={errors.akteFile}
                />

                {/* 🔐 PREVIEW AKTE (HIDDEN - LOGIC ONLY) */}
                {aktePreview && (
                  <div className="mt-3 border rounded-lg p-3 bg-gray-50">
                    {aktePreview.type === "application/pdf" ? (
                      <div className="text-sm text-gray-600">
                        📄 File PDF siap dikirim
                      </div>
                    ) : (
                      <img
                        src={aktePreview.url}
                        alt="Preview Akte Kelahiran"
                        className="max-h-40 rounded-md border"
                      />
                    )}
                  </div>
                )}

                <div className="md:col-span-2">
                  <Input
                    icon={Alamat}
                    label="Alamat Lengkap"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </form>

              {/* BUTTON */}
              <div className="flex justify-end mt-14">
                <button
                  disabled={!canSubmit}
                  onClick={handleSubmit}
                  className={`px-10 py-3 rounded-xl font-semibold shadow-lg transition
              ${
                canSubmit
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
                >
                  Lanjut ke Pembayaran →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ===== SMALL COMPONENTS ===== */

function Step({ icon, label, active }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${active ? "bg-yellow-500" : "bg-gray-200"}`}
      >
        <img src={icon} className={`w-5 ${active ? "invert" : "opacity-60"}`} />
      </div>
      <span
        className={`mt-2 text-xs font-semibold ${active ? "text-yellow-600" : "text-gray-400"}`}
      >
        {label}
      </span>
    </div>
  );
}

function Line() {
  return <div className="w-10 h-[2px] bg-yellow-200" />;
}

function Input({ icon, label, error, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <div className="relative">
        <img
          src={icon}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 opacity-60"
        />
        <input
          {...props}
          className={`w-full pl-12 pr-4 py-3 rounded-lg border
          ${error ? "border-red-400" : "border-gray-300"} outline-none`}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function Select({
  icon,
  label,
  products,
  loading,
  value,
  onChange,
  name,
  ...props
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  const selectedProduct = products.find((p) => p.id === value);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (productId) => {
    onChange({ target: { name, value: productId } });
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef}>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <div className="relative">
        <img
          src={icon}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 opacity-60 z-10 pointer-events-none"
        />

        {/* Custom Dropdown Button */}
        <button
          type="button"
          onClick={() => !loading && setIsOpen(!isOpen)}
          disabled={loading}
          className="w-full pl-12 pr-10 py-3 rounded-lg border border-gray-300 disabled:bg-gray-100 text-left bg-white flex items-center justify-between"
        >
          {loading ? (
            <span className="text-gray-500">Memuat jenjang...</span>
          ) : selectedProduct ? (
            <span className="flex items-center gap-2">
              <span className="font-medium">
                {selectedProduct.product_name}
              </span>
              <span className="text-red-500 line-through text-sm">
                {formatRupiah(selectedProduct.base_price)}
              </span>
              <span className="text-gray-700 text-sm">
                {formatRupiah(selectedProduct.set_price)}
              </span>
            </span>
          ) : (
            <span className="text-gray-500">Pilih jenjang pendidikan</span>
          )}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && !loading && (
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {products.length === 0 ? (
              <div className="px-4 py-3 text-gray-500 text-sm">
                Tidak ada jenjang tersedia
              </div>
            ) : (
              products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleSelect(product.id)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex flex-col gap-1 border-b last:border-b-0 ${
                    value === product.id ? "bg-yellow-50" : ""
                  }`}
                >
                  <span className="font-medium text-gray-800">
                    {product.product_name}
                  </span>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-red-500 line-through">
                      {formatRupiah(product.base_price)}
                    </span>
                    <span className="text-gray-700 font-semibold">
                      {formatRupiah(product.set_price)}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Upload({
  icon,
  label,
  name,
  error,
  onChange,
  accept,
}) {
  const fileRef = useRef(null);

  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <div className="relative">
        <img
          src={icon}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 opacity-60"
        />
        <input
          type="file"
          ref={fileRef}
          name={name}
          onChange={onChange}
          accept={accept}
          className="w-full pl-12 py-3 border rounded-lg"
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
