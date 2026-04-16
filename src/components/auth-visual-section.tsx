import { Waves } from "lucide-react";
import React from "react";

interface AuthVisualSectionProps {
  title: string;
  description: string;
  iconColor?: string;
}

export function AuthVisualSection({
  title,
  description,
}: AuthVisualSectionProps) {
  return (
    <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center bg-gray-50 p-12 text-center relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="relative z-10">
        <Waves className={`w-32 h-32 text-pink-400 mx-auto`} />
        <h1 className="mt-6 text-4xl font-bold text-gray-800">{title}</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}
