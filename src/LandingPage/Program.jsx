import React, { useRef, useState } from "react";
import Playgroup from "../assets/Program/ProgramU.png";
import Kindergarten from "../assets/Program/ProgramUn.png";
import Pendidikan from "../assets/Pendaftarann/Toga.svg";

export default function Program() {
  const playgroupRef = useRef(null);
  const kindergartenRef = useRef(null);

  const phoneNumber = "6282220009850";

  const sendWhatsApp = (program) => {
    const message = `
Assalamu’alaikum Warahmatullahi Wabarakatuh 😊

Perkenalkan, saya ingin berkonsultasi mengenai program:
📘 ${program}

Mohon informasi lebih lanjut.

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
    <section
      id="program"
      className="bg-[#FAFAFA] py-16 sm:py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ================= HEADER ================= */}
        <div className="max-w-xl mb-12 sm:mb-16">
          <span className="inline-block text-xs sm:text-sm font-semibold text-yellow-600 bg-yellow-100 px-4 py-1 rounded-full mb-4">
            Program Pendidikan
          </span>

          <h2 className="
            text-2xl sm:text-3xl lg:text-4xl
            font-bold text-gray-900
            leading-snug
          ">
            Pendidikan Islami yang
            <br className="hidden sm:block" />
            Terstruktur & Berkarakter
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-600">
            Kurikulum terpadu untuk membentuk anak sholeh,
            cerdas, dan mandiri sejak usia dini.
          </p>
        </div>

        {/* ================= JENJANG ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <img src={Pendidikan} className="w-4 h-4" />
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 sm:mb-24">
          <ProgramBox title="Program Inti" items={corePrograms} />
          <ProgramBox title="Program Tambahan" items={additionalPrograms} />
          <ProgramBox title="Ekstrakurikuler" items={extracurriculars} />
        </div>

        {/* ================= PROGRAM CARDS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
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
      min-w-[200px] sm:min-w-0
      p-4 text-left rounded-2xl
      border border-gray-200
      hover:border-yellow-500 hover:bg-yellow-50
      transition text-sm
    "
  >
    <p className="font-semibold text-gray-900">{title}</p>
    <p className="text-xs text-gray-500 mt-1">{age}</p>
  </button>
);

const ProgramBox = ({ title, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center font-bold text-base sm:text-lg"
      >
        {title}
        <span>{open ? "−" : "+"}</span>
      </button>

      <ul className={`mt-4 space-y-2 text-sm text-gray-600 ${open ? "block" : "hidden md:block"}`}>
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-yellow-500">✔</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProgramCard = ({ refProp, image, title, age, onClick }) => (
  <div
    ref={refProp}
    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
  >
    <div className="bg-[#FFF4E8] h-[200px] sm:h-[240px] lg:h-[260px] flex items-center justify-center">
      <img src={image} className="max-h-full" />
    </div>

    <div className="p-6 sm:p-8 lg:p-10">
      <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
        {age}
      </span>

      <h3 className="text-xl sm:text-2xl font-bold mt-4 mb-4">
        {title}
      </h3>

      <button
        onClick={onClick}
        className="
          w-full sm:w-auto
          bg-yellow-500 text-white
          py-3 px-6 rounded-xl
          font-semibold text-sm sm:text-base
          hover:bg-yellow-600 transition
        "
      >
        Konsultasi Program →
      </button>
    </div>
  </div>
);
