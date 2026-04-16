"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  Frame,
  Map,
  PieChart,
  School2,
  ShoppingBag,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import { TeamSwitcher } from "@/components/dashboard/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMainAdmin } from "@/constants/nav-main-admin";


// This is sample data.
const data = {
  user: {
    name: "Ambdulghaffar Ahamadi",
    email: "ambdulghaffar@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "ElectroTech",
      logo: ShoppingBag,
      plan: "Boutique en ligne",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Gratuit",
    },
  ],
  navMain: NavMainAdmin,
  projects: [
    {
      name: "Ingénierie de conception",
      url: "#",
      icon: Frame,
    },
    {
      name: "Ventes et marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Voyage",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
