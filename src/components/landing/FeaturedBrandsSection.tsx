import Image from "next/image";
import { featuredBrandsData } from "@/data/landing-page";

export default function FeaturedBrandsSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">
          Marques en vedette
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {featuredBrandsData.map((brand) => (
            <div key={brand.name} className="flex justify-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
