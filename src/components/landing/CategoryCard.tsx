import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  image: string;
}

export default function CategoryCard({ name, image }: CategoryCardProps) {
  return (
    <Link href="#" className="group block">
      <div className="overflow-hidden rounded-lg bg-orange-100">
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{name}</h3>
        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
