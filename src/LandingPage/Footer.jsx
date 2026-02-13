import React from "react";

// Assets
import Logo from "../assets/images/Beranda/Logo.jpg";
import LokasiIcon from "../assets/images/Beranda/location.svg";
import TelponIcon from "../assets/images/Beranda/Telpon.svg";
import EmailIcon from "../assets/images/Beranda/Docum.svg";

/* ================= INLINE SVG ICONS ================= */

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
  </svg>
);

const EmailIconSvg = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 0l8 5 8-5H4zm16 12V8l-8 5-8-5v10h16z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M23 7s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C17.1 4 12 4 12 4h-.1s-5.1 0-8 .1c-.4.1-1.3.1-2.1.9-.6.6-.8 2-.8 2S1 8.6 1 10.3v1.4C1 13.4 1.2 15 1.2 15s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.7.2 7.6.2 7.6.2s5.1 0 8-.1c.4-.1 1.3-.1 2.1-.9.6-.6.8-2 .8-2s.2-1.6.2-3.3v-1.4C23.2 8.6 23 7 23 7zM9.8 14.6V8.9l5.4 2.9-5.4 2.8z"/>
  </svg>
);

/* ================= FOOTER ================= */

export default function Footer() {
  return (
    <footer
      id="kontak"
      className="
        bg-gradient-to-b
        from-[#1B1B1B]
        to-black
        text-gray-300
        pt-14 sm:pt-16 lg:pt-20
      "
    >

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">

          {/* ===== BRAND ===== */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
              <img
                src={Logo}
                alt="Khadijah Islamic Preschool"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="text-white font-bold text-base sm:text-lg">
                Khadijah Islamic
              </span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm mx-auto sm:mx-0">
              Membentuk generasi islami yang sholeh, cerdas, dan mandiri
              melalui pendidikan Islam modern berbasis karakter.
            </p>

            <div className="flex justify-center sm:justify-start gap-4">
              <SocialLink
                href="https://www.instagram.com/khadijahislamicpreschool/"
                icon={<InstagramIcon />}
              />
              <SocialLink
                href="mailto:khadijahislamicpreschool@gmail.com"
                icon={<EmailIconSvg />}
              />
              <SocialLink
                href="https://www.youtube.com/@khadijahislamicpreschool"
                icon={<YoutubeIcon />}
              />
            </div>
          </div>

          {/* ===== QUICK LINKS ===== */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm sm:text-base">
              Tautan Cepat
            </h4>

            <ul className="space-y-3 text-sm">
              <li><a href="#beranda" className="hover:text-yellow-500 transition">Beranda</a></li>
              <li><a href="#tentang" className="hover:text-yellow-500 transition">Tentang Kami</a></li>
              <li><a href="#program" className="hover:text-yellow-500 transition">Program Pendidikan</a></li>
              <li><a href="#pendaftaran" className="hover:text-yellow-500 transition">Pendaftaran</a></li>
            </ul>
          </div>

          {/* ===== CONTACT ===== */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm sm:text-base">
              Hubungi Kami
            </h4>

            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <img src={LokasiIcon} className="w-5 h-5 mt-1" />
                <span>
                  Jl. Anggrek Raya 1 (Harapan Indah) KM 12, Kota Sorong
                </span>
              </li>

              <li className="flex gap-3">
                <img src={TelponIcon} className="w-5 h-5" />
                <a href="tel:+6282220009890" className="hover:text-yellow-500">
                  +62 822-2000-9890
                </a>
              </li>

              <li className="flex gap-3">
                <img src={EmailIcon} className="w-5 h-5" />
                <a
                  href="mailto:khadijahislamicpreschool@gmail.com"
                  className="hover:text-yellow-500"
                >
                  khadijahislamicpreschool@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* ===== MAP ===== */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm sm:text-base">
              Lokasi Sekolah
            </h4>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="Google Maps Khadijah Islamic Preschool"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.332009981678!2d131.32886449999998!3d-0.8945863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d5955aedc3509f5%3A0xecb20c710c1e2bb8!2sBIMBEL%20KURSUS%20RUMAH%20SUKSES!5e0!3m2!1sen!2sid!4v1763122127944!5m2!1sen!2sid"
                className="w-full h-[180px] sm:h-[220px] border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="border-t border-gray-800">
        <div className="
          max-w-7xl mx-auto
          px-4 sm:px-6
          py-5
          flex flex-col md:flex-row
          justify-between items-center
          text-xs sm:text-sm
          text-gray-500
          gap-4
        ">
          <p>© 2024 Khadijah Islamic Preschool. Seluruh hak cipta dilindungi.</p>

          <div className="flex gap-6">
            <a className="hover:text-yellow-500 cursor-pointer">
              Syarat & Ketentuan
            </a>
            <a className="hover:text-yellow-500 cursor-pointer">
              Kebijakan Privasi
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}

/* ================= SUB ================= */

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="
      w-9 h-9 sm:w-10 sm:h-10
      bg-gray-800
      hover:bg-yellow-500
      rounded-full
      flex items-center justify-center
      transition text-white
    "
  >
    {icon}
  </a>
);
