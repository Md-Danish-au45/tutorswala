import Header from "../components/sections/Header";
import HeroSection from "../components/sections/hero-section";
import FeaturesSection from "../components/sections/features-section";
import HowItWorks from "../components/sections/howitwroks-Section";
import TutorsSection from "../components/sections/tutors-section";
import Testimonials from "../components/sections/testimonials-Section";
import CtaSection from "../components/sections/ctaSection";
import FaqSection from "../components/sections/faqSection";
import Footer from "../components/sections/footer";
import ContactWidget from "../components/widgets/contact-widget";
import ContactSection from "../components/sections/contact";
import CourseSection from "../components/sections/courseSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CourseSection />
        <HowItWorks />
        <TutorsSection />
        <Testimonials />
        <CtaSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <ContactWidget />
    </div>
  );
}
