import Image from "next/image";
import { testimonialsData } from "@/data/landing-page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TestimonialsSection() {
  return (
    <section className="bg-stone-200 py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Approuvé par les Amateurs de Technologie
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-lg border bg-white p-6 shadow-sm"
            >
              <p className="mb-6 text-gray-600">&quot;{testimonial.quote}&quot;</p>
              <div className="flex items-center">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
