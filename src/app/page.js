import Bootscreen from "../components/Bootscreen";
import AnimasiScroll from "../components/AnimasiScroll";
import SystemBar from "../components/SystemBar";
import MenuUtama from "../components/MenuUtama";
import ProfilPemain from "../components/ProfilPemain";
import Inventori from "../components/Inventori";
import Pengalaman from "../components/Pengalaman";
import Projek from "../components/Projek";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Bootscreen />

      <AnimasiScroll />
      <div id="konten">
        <SystemBar />
        <MenuUtama />
        <ProfilPemain />
        <Inventori />
        <Pengalaman />
        <Projek />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}