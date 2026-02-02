import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
import KK from "../assets/Pendaftarann/file.svg";
import EmailIcon from "../assets/Pendaftarann/email.svg"; // ⬅️ TAMBAH ICON EMAIL

export default function Pendaftaran1() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    parentName: "",
    email: "",              // ⬅️ TAMBAH
    childName: "",
    whatsapp: "",
    birthDate: "",
    level: "",
    address: "",
    kkFile: null,
  });

  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  // ===== AUTO ISI DARI LANDING PAGE =====
  useEffect(() => {
    if (location.state) {
      setFormData((prev) => ({
        ...prev,
        parentName: location.state.parentName || "",
        childName: location.state.childName || "",
        whatsapp: location.state.whatsapp || "",
      }));
    }
  }, [location.state]);

  // ===== HANDLE CHANGE + VALIDASI =====
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newErrors = { ...errors };

    // Validasi WhatsApp
    if (name === "whatsapp") {
      const regex = /^[0-9]{10,15}$/;
      if (!regex.test(value)) {
        newErrors.whatsapp = "Nomor WhatsApp tidak valid";
      } else {
        delete newErrors.whatsapp;
      }
    }

    // Validasi Email
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        newErrors.email = "Format email tidak valid";
      } else {
        delete newErrors.email;
      }
    }

    // Validasi File KK (max 2MB)
    if (name === "kkFile" && files?.length) {
      const file = files[0];
      const maxSize = 2 * 1024 * 1024;

      if (file.size > maxSize) {
        newErrors.kkFile = "Ukuran file melebihi 2MB";
        setErrors(newErrors);
        return;
      } else {
        delete newErrors.kkFile;
      }
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
      formData.email.trim() !== "" &&        // ⬅️ TAMBAH
      formData.whatsapp.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.kkFile !== null &&
      !errors.whatsapp &&
      !errors.email &&
      !errors.kkFile;

    setCanSubmit(valid);
  }, [formData, errors]);

  // ===== SUBMIT =====
  const handleSubmit = () => {
    if (!canSubmit) return;
    navigate("/pendaftaran/pembayaran", { state: formData });
  };

  return (
    <section className="min-h-screen bg-[#FFF9F1] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900">
            Formulir Pendaftaran Siswa Baru
          </h1>
          <p className="text-gray-600 mt-3">
            Lengkapi seluruh data Ananda untuk melanjutkan pendaftaran.
          </p>
        </div>

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
              options={["Playgroup", "TK A", "TK B"]}
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
              label="Upload Kartu Keluarga"
              name="kkFile"
              onChange={handleChange}
              error={errors.kkFile}
            />

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
              ${canSubmit
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              Lanjut ke Pembayaran →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== COMPONENTS ===== */

function Step({ icon, label, active }) {
  return (
    <div className="flex flex-col items-center text-sm">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center
        ${active ? "bg-yellow-500" : "bg-gray-200"}`}>
        <img src={icon} className={`w-6 ${active ? "invert" : "opacity-60"}`} />
      </div>
      <span className={`mt-2 font-semibold ${active ? "text-yellow-600" : "text-gray-400"}`}>
        {label}
      </span>
    </div>
  );
}

function Line() {
  return <div className="w-16 h-[2px] bg-orange-200" />;
}

function Input({ icon, label, helper, error, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <div className="relative">
        <img src={icon} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 opacity-60" />
        <input
          {...props}
          className={`w-full pl-12 pr-4 py-3 rounded-lg border
          ${error ? "border-red-400" : "border-gray-300"} outline-none`}
        />
      </div>
      {helper && <p className="text-xs text-gray-500 mt-1">{helper}</p>}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function Select({ icon, label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <div className="relative">
        <img src={icon} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 opacity-60" />
        <select {...props} className="w-full pl-12 py-3 rounded-lg border border-gray-300">
          <option value="">Pilih jenjang</option>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
    </div>
  );
}

function Upload({ icon, label, error, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <div className="relative">
        <img src={icon} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 opacity-60" />
        <input type="file" {...props} className="w-full pl-12 py-3 border rounded-lg" />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
