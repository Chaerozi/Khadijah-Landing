import React, { useRef, useState } from "react";
import Playgroup from "../assets/Program/ProgramU.png";
import Kindergarten from "../assets/Program/ProgramUn.png";
import Pendidikan from "../assets/Pendaftarann/Toga.svg";

export default function Program() {
  const playgroupRef = useRef(null);
  const kindergartenRef = useRef(null);

  const phoneNumber = "6282220009850"; // GANTI nomor admin

  const sendWhatsApp = (program) => {
    const message = `
Assalamu’alaikum Warahmatullahi Wabarakatuh 😊

Perkenalkan, saya ingin bertanya dan berkonsultasi mengenai program:
📘 ${program}

Mohon informasi lebih lanjut.
Terima kasih atas perhatian dan bantuannya.

Wassalamu’alaikum Warahmatullahi Wabarakatuh
`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const scrollTo = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth" });

  const corePrograms = [
    "Aqidah & Morality Learning",
    "Daily Prayers",
    "Short Surah (Juz 30)",
    "Dhuha & Hadits",
    "Asmaul Husna",
    "Sirah Nabawiyah",
    "Montessori Curriculum",
  ];

  const additionalPrograms = [
    "Reading & Writing",
    "Market Day",
    "Parenting",
    "Parent Teaching Day",
    "Outdoor Learning",
    "Practical Life Skill",
  ];

  const extracurriculars = ["Art", "English", "Arabic", "Drumband"];

  return (
    <section id="program" className="bg-[#FAFAFA] py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="max-w-2xl mb-20">
          <span className="inline-block text-sm font-semibold text-yellow-600 bg-yellow-100 px-4 py-1 rounded-full mb-4">
            Program Pendidikan
          </span>
          <h2 className="text-4xl font-bold text-gray-900 leading-snug">
            Pendidikan Islami yang<br />Terstruktur & Berkarakter
          </h2>
          <p className="mt-4 text-gray-600">
            Kurikulum terpadu untuk membentuk anak sholeh, cerdas, dan mandiri
            sejak usia dini.
          </p>
        </div>

        {/* ================= JENJANG ================= */}
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 bg-yellow-100 rounded-xl flex items-center justify-center">
              <img src={Pendidikan} className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Jenjang Pendidikan
            </h3>
          </div>

          <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto sm:overflow-visible pb-2">
            <Jenjang title="Playgroup" age="3–4 Tahun" onClick={() => scrollTo(playgroupRef)} />
            <Jenjang title="Kindergarten A" age="4–5 Tahun" onClick={() => scrollTo(kindergartenRef)} />
            <Jenjang title="Kindergarten B" age="5–6 Tahun" onClick={() => scrollTo(kindergartenRef)} />
          </div>
        </div>

        {/* ================= PROGRAM VALUE ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
          <ProgramBox title="Program Inti" items={corePrograms} />
          <ProgramBox title="Program Tambahan" items={additionalPrograms} />
          <ProgramBox title="Ekstrakurikuler" items={extracurriculars} />
        </div>

        {/* ================= PROGRAM CARDS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <ProgramCard
            refProp={playgroupRef}
            image={Playgroup}
            title="Playgroup"
            age="Usia 3–4 Tahun"
            onClick={() => sendWhatsApp("Playgroup")}
          />
          <ProgramCard
            refProp={kindergartenRef}
            image={Kindergarten}
            title="Kindergarten (TK A & B)"
            age="Usia 4–6 Tahun"
            onClick={() => sendWhatsApp("Kindergarten")}
          />
        </div>

      </div>

      {/* ================= STICKY CTA MOBILE ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg sm:hidden">
        <div className="flex">
          <button
            onClick={() => scrollTo(playgroupRef)}
            className="flex-1 py-4 text-sm font-semibold text-gray-700"
          >
            Lihat Program
          </button>
          <button
            onClick={() => sendWhatsApp("Pendaftaran")}
            className="flex-1 py-4 text-sm font-semibold bg-yellow-500 text-white"
          >
            Konsultasi WA
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================= SUB COMPONENTS ================= */

const Jenjang = ({ title, age, onClick }) => (
  <button
    onClick={onClick}
    className="
      min-w-[220px] sm:min-w-0
      p-5 text-left rounded-2xl
      border border-gray-200
      hover:border-yellow-500 hover:bg-yellow-50
      transition
    "
  >
    <p className="font-semibold text-gray-900">{title}</p>
    <p className="text-sm text-gray-500 mt-1">{age}</p>
  </button>
);

const ProgramBox = ({ title, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center font-bold text-lg"
      >
        {title}
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>

      {(open || window.innerWidth >= 768) && (
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-yellow-500">✔</span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ProgramCard = ({ refProp, image, title, age, desc, onClick }) => (
  <div
    ref={refProp}
    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
  >
    <div className="bg-[#FFF4E8] h-[260px] flex items-center justify-center">
      <img src={image} className="max-h-full" />
    </div>
    <div className="p-10">
      <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
        {age}
      </span>
      <h3 className="text-2xl font-bold mt-4 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{desc}</p>
      <button
        onClick={onClick}
        className="
          w-full sm:w-auto
          bg-yellow-500 text-white
          py-3 px-6 rounded-xl
          font-semibold
          hover:bg-yellow-600 transition
        "
      >
        Konsultasi Program →
      </button>
    </div>
  </div>
);
