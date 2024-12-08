import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { AnimatedBackground } from "@/components/animated-background";
import { TechStack } from "@/components/tech-stack";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Location } from "@/components/location";

export default function Home() {
  return (
    <div className="min-h-screen text-white antialiased overflow-x-hidden">
      <AnimatedBackground />
      <Nav />
      <Hero />
      <TechStack />
      <Services />
      <Testimonials />
      <CTA />
      <Location />
      <Footer />
    </div>
  );
}
