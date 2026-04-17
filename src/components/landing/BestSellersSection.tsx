import { bestSellersData } from "@/data/landing-page";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";

export default function BestSellersSection() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Nos meilleures ventes
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Les gadgets les mieux notés, approuvés par des milliers de clients à travers le monde.
            </p>
          </div>
          <Button variant="outline">Voir tout</Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellersData.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
