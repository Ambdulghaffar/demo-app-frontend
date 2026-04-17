import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideProps } from "lucide-react";
import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  iconBgColor?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconBgColor = "bg-gray-100",
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBgColor}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
