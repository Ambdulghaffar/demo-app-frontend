// components/dashboard/sidebar-breadcrumb.tsx
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import UserProfile from "./user-profile";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import DynamicBreadcrumb from "./dynamic-breadcrumb";

interface SidebarBreadcrumbProps {
  values?: Record<string, string>;
}

export default function SidebarBreadcrumb({ values }: SidebarBreadcrumbProps) {
  return (
    <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <DynamicBreadcrumb values={values} />
      </div>
      <div className="flex items-center gap-2 px-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." className="pl-8 w-[200px]" />
        </div>
        <UserProfile showDashboardLink={false} />
      </div>
    </header>
  );
}
