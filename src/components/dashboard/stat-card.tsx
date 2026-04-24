import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideProps } from "lucide-react";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  iconBgColor?: string;
  description?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconBgColor = "bg-gray-100",
  description,
}: StatCardProps) {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBgColor} transition-colors duration-200`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
