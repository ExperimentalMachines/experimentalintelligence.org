import Dataset from "@/components/Dataset";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Model from "@/components/Model";
import Nav from "@/components/Nav";
import People from "@/components/People";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Model />
        <Dataset />
        <People />
      </main>
      <Footer />
    </>
  );
}
