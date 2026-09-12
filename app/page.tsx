import Dataset from "@/components/Dataset";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Model from "@/components/Model";
import Nav from "@/components/Nav";
import OpenGrad from "@/components/OpenGrad";
import People from "@/components/People";
import TrainingRun from "@/components/TrainingRun";

// The hero states both headline results and nothing else. The two sections
// that follow give each of them its own space, in the order the hero
// introduced them, before the page returns to the work underneath.
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <OpenGrad />
        <Model />
        <TrainingRun />
        <Dataset />
        <People />
      </main>
      <Footer />
    </>
  );
}
