import AboutBarbershopGallery from "@/components/AboutRefugeSection";
import AboutRefugeSection from "@/components/AboutRefugeSection";
import AnimatedServicesMenu from "@/components/AnimatedServicesMenu";
import BarberCarousel from "@/components/BArberCarouselG";
import BarberHero from "@/components/BarberHero";
import ExcellenceSection from "@/components/ExcellenceSection";
import FoodCategoryCarousel from "@/components/FoodCategoryCarousel";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

export default function Home() {
  return (
    <div>
      <BarberHero />
      <ExcellenceSection />
      <BarberCarousel />
      <AboutBarbershopGallery />
      <WhyChooseUsSection />
    </div>
  );
}