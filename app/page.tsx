// src/app/page.tsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import ModernMinimalist from "./components/ModernMinimalist";
import Stats from "./components/Stats";
import TimelessCharm from "./components/TimelessCharm";
import Collection from "./components/Collection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-[#d6bfa2]">
      <Hero />
      <main className="px-2 md:px-12 items-center justify-center flex flex-col">
        <ModernMinimalist />
        <Stats />
        <TimelessCharm />
        <Collection />
      </main>

      <Footer />
    </div>
  );
}
