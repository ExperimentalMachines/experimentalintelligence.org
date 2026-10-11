import Footer from "@/components/Footer";
import FromScratch from "@/components/FromScratch";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OpenGrad from "@/components/OpenGrad";
import Taglish from "@/components/Taglish";
import Team from "@/components/Team";
import ToolChoice from "@/components/ToolChoice";

// The hero names the lab and shows two results; each project then gets its
// own section, in the order the project strip lists them.
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <OpenGrad />
        <ToolChoice />
        <FromScratch />
        <Taglish />
        <Team />
      </main>
      <Footer />
    </>
  );
}
