import Header from "@/app/components/header";
import HeroSection from "@/app/components/hero";
import ServicesSection from "@/app/components/services";
import AboutSection from "@/app/components/about";
import TestimonialsSection from "@/app/components/testimonials";
import ContactSection from "@/app/components/contact";
import Footer from "@/app/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
