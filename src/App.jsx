import { Routes, Route } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Hero from "./LandingPage/Hero";
import Akreditasi from "./LandingPage/Akreditasi";
import WhyChooseUs from "./LandingPage/WhyChooseUs";
import Program from "./LandingPage/Program";
import Registration from "./LandingPage/Registration";
import Footer from "./LandingPage/Footer";

import Pendaftaran1 from "./Payment/Pendaftaran1";
import Pembayaran from "./Payment/Pembayaran";
import Berhasil from "./Payment/Berhasil";

import ScrollToHash from "./Utilss/ScrollToHash";

function Home() {
  return (
    <>
      <Hero />
      <Akreditasi/>
      <WhyChooseUs />
      <Program />
      <Registration />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <ScrollToHash />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pendaftaran" element={<Pendaftaran1 />} />
        <Route path="/pendaftaran/pembayaran" element={<Pembayaran />} />
        <Route path="/pendaftaran/berhasil" element={<Berhasil />} />
      </Routes>
    </>
  );
}
