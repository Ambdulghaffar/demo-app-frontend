import { categoriesData } from "@/data/landing-page";
import CategoryCard from "./CategoryCard";
import { Button } from "@/components/ui/button";

export default function CategoriesSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Découvrez nos catégories
          </h2>
          <Button variant="outline">Toutes les catégories</Button>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {categoriesData.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
