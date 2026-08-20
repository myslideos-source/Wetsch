import ClientProviders from "@/components/ClientProviders";
import Hero from "@/components/sections/Hero";
import ConstructionStory from "@/components/sections/ConstructionStory";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import SiteExplorer from "@/components/sections/SiteExplorer";
import Calculators from "@/components/sections/Calculators";
import Configurator from "@/components/sections/Configurator";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <ClientProviders>
      <Hero />
      <ConstructionStory />
      <Services />
      <Projects />
      <SiteExplorer />
      <Calculators />
      <Configurator />
      <About />
      <Stats />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
    </ClientProviders>
  );
}
