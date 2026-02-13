import React, { useState, useEffect, useRef } from "react";
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
import KK from "../assets/Pendaftarann/File.svg";
import EmailIcon from "../assets/Pendaftarann/email.svg";

export default function Pendaftaran1() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    childName: "",
    whatsapp: "",
    birthDate: "",
    level: "",
    address: "",
    kkFile: null,
    aktaFile: null,
  });

  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const [kkPreview, setKkPreview] = useState(null);
  const [aktaPreview, setAktaPreview] = useState(null);

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

    if ((name === "kkFile" || name === "aktaFile") && files?.length) {
      const file = files[0];
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      const maxSize = 2 * 1024 * 1024;

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

      if (name === "kkFile") setKkPreview(preview);
      if (name === "aktaFile") setAktaPreview(preview);
    }

    setErrors(newErrors);
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  useEffect(() => {
    const valid =
      formData.childName &&
      formData.birthDate &&
      formData.level &&
      formData.parentName &&
      formData.email &&
      formData.whatsapp &&
      formData.address &&
      formData.kkFile &&
      formData.aktaFile &&
      !errors.whatsapp &&
      !errors.email &&
      !errors.kkFile &&
      !errors.aktaFile;

    setCanSubmit(valid);
  }, [formData, errors]);

  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        payload.append(key, formData[key]);
      });

      await fetch(
        "https://khadijahbackendv2-production.up.railway.app/api/registration",
        { method: "POST", body: payload }
      );
    } catch (err) {
      console.log("Backend error diabaikan:", err);
    }

    navigate("/pendaftaran/pembayaran", { state: formData });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="mt-18 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Formulir Pendaftaran
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Lengkapi data berikut untuk melanjutkan pendaftaran
          </p>
        </div>

        {/* STEPPER */}
        <div className="flex justify-center items-center gap-8 mb-12 text-sm">
          <Step icon={IsiData} label="Isi Data" active />
          <Line />
          <Step icon={Pembayaran} label="Pembayaran" />
          <Line />
          <Step icon={Selesai} label="Selesai" />
        </div>

        {/* FORM */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Input icon={Anak} label="Nama Ananda" name="childName" value={formData.childName} onChange={handleChange} />
            <Input icon={Tanggal} type="date" label="Tanggal Lahir" name="birthDate" value={formData.birthDate} onChange={handleChange} />
            <Select icon={Pendidikan} label="Jenjang" name="level" value={formData.level} onChange={handleChange} options={["Playgroup", "TK A", "TK B"]} />
            <Input icon={Wali} label="Nama Orang Tua" name="parentName" value={formData.parentName} onChange={handleChange} />
            <Input icon={EmailIcon} label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
            <Input icon={Nomor} label="WhatsApp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} error={errors.whatsapp} />

            <Upload icon={KK} label="Upload KK" name="kkFile" accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleChange} error={errors.kkFile}
              preview={kkPreview} setPreview={setKkPreview}
              setFormData={setFormData}
            />

            <Upload icon={KK} label="Upload Akta Kelahiran" name="aktaFile"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleChange} error={errors.aktaFile}
              preview={aktaPreview} setPreview={setAktaPreview}
              setFormData={setFormData}
            />

            <div className="md:col-span-2">
              <Input icon={Alamat} label="Alamat Lengkap" name="address" value={formData.address} onChange={handleChange} />
            </div>
          </div>

          {/* BUTTON */}
          <div className="mt-10 text-right">
            <button
              disabled={!canSubmit}
              onClick={handleSubmit}
              className={`px-8 py-3 rounded-xl font-semibold shadow transition
              ${canSubmit
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
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

/* ===== SMALL COMPONENTS ===== */

function Step({ icon, label, active }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${active ? "bg-yellow-500" : "bg-gray-200"}`}>
        <img src={icon} className={`w-5 ${active ? "invert" : "opacity-60"}`} />
      </div>
      <span className={`mt-2 text-xs font-semibold ${active ? "text-yellow-600" : "text-gray-400"}`}>
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
        <img src={icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 opacity-60" />
        <input {...props} className={`w-full pl-10 pr-3 py-2 rounded-lg border ${error ? "border-red-400" : "border-gray-300"}`} />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function Select({ icon, label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <div className="relative">
        <img src={icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 opacity-60" />
        <select {...props} className="w-full pl-10 py-2 rounded-lg border border-gray-300">
          <option value="">Pilih Jenjang</option>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
    </div>
  );
}

function Upload({ icon, label, name, error, onChange, accept, preview, setPreview, setFormData }) {
  const fileRef = useRef(null);

  const handleRemove = () => {
    setPreview(null);
    setFormData(prev => ({ ...prev, [name]: null }));
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <input
        ref={fileRef}
        type="file"
        name={name}
        accept={accept}
        onChange={onChange}
        className="hidden"
      />
      <div
        onClick={() => fileRef.current.click()}
        className="border-2 border-dashed border-yellow-300 rounded-xl p-4 text-center bg-yellow-50 cursor-pointer"
      >
        {!preview ? (
          <p className="text-sm text-gray-600">Klik untuk upload (Max 2MB)</p>
        ) : (
          <div className="space-y-2">
            {preview.type === "application/pdf" ? (
              <p>📄 File PDF siap</p>
            ) : (
              <img src={preview.url} className="max-h-32 mx-auto rounded-lg" />
            )}
            <button type="button" onClick={handleRemove} className="text-red-500 text-xs">Hapus</button>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
