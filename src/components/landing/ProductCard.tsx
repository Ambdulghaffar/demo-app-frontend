import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  category: string;
  description: string;
  price: string;
  oldPrice?: string;
  image: string;
  tag: string;
}

export default function ProductCard({
  name,
  category,
  price,
  oldPrice,
  image,
  tag,
}: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border">
      <div className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
        {tag}
      </div>
      <Link href="#" className="block">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="p-4">
        <p className="text-sm text-gray-500">{category}</p>
        <h3 className="mt-1 text-lg font-semibold text-gray-900">
          <Link href="#">
            <span className="absolute inset-0" />
            {name}
          </Link>
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">${price}</span>
          {oldPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${oldPrice}
            </span>
          )}
        </div>
        <Button className="mt-4 w-full" variant="outline">
          Quick View
        </Button>
      </div>
    </div>
  );
}
