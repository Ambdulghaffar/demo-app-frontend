import Image from "next/image";
import { Button } from "@/components/ui/button";
import { heroData } from "@/data/landing-page";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-[#E53E3E] via-[#FFF5F0] to-white">
      <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 md:px-6 lg:gap-12">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            {heroData.title}
          </h1>
          <p className="text-lg text-gray-600">{heroData.subtitle}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-[#E53E3E] text-white hover:bg-[#C53030]"
            >
              Acheter maintenant
            </Button>
            <Button size="lg" variant="outline">
              Voir tous les gadgets
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src={heroData.image}
            alt="Smartwatch"
            width={500}
            height={500}
            className="h-auto w-full max-w-sm rounded-lg object-cover mix-blend-multiply"
          />
        </div>
      </div>
    </section>
  );
}
