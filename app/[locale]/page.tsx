import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import Team from "@/components/Team";
import Services from "@/components/Services";
import Equipment from "@/components/Equipment";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Welcome />
        {/* <Team /> */}
        <Services />
        <Equipment />
        {/* <Gallery /> */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
