
import AboutBarbershopGallery from "@/components/AboutBarbershopGallery";
import AnimatedServicesMenu from "@/components/AnimatedServicesMenu";
import BarberCarousel from "@/components/BArberCarouselG";
import BarberHero from "@/components/BarberHero";
import CTASection from "@/components/CTASection";
import ExcellenceSection from "@/components/ExcellenceSection";
import FoodCategoryCarousel from "@/components/FoodCategoryCarousel";
import Footer from "@/components/Footer";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import Navbar from "@/components/Navbar";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

export default function Home() {
  return (
    <div>
      <BarberHero />
      <ExcellenceSection />
      <BarberCarousel />
      <AboutBarbershopGallery />
      <GoogleReviewsSection />
      <CTASection />
      <Footer />
    </div>
  );
}