import Header from "@/components/header";
import BestSellersSection from "@/components/landing/BestSellersSection";
import CategoriesSection from "@/components/landing/CategoriesSection";
import FeaturedBrandsSection from "@/components/landing/FeaturedBrandsSection";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <CategoriesSection />
      <BestSellersSection />
      <FeaturedBrandsSection />
      <Footer />
    </>
  );
}
