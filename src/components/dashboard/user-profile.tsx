"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  BadgeCheck,
  Bell,
  CreditCard,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { ROUTES } from "@/constants/route";
import Link from "next/link";

interface UserProfileProps {
  showDashboardLink?: boolean;
}

export default function UserProfile({ showDashboardLink = true }: UserProfileProps) {
  const { data: session } = useSession();
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src="Images/users/daniel.jpg"
              alt={session?.user?.name}
            />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg">
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src="Images/users/daniel.jpg"
                  alt={session?.user?.name}
                />
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {session?.user?.name}
                </span>
                <span className="truncate text-xs">{session?.user?.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {showDashboardLink && (
              <DropdownMenuItem>
                <LayoutDashboard />
                <Link href={ROUTES.DASHBOARD}>Tableau de bord</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <User />
              Profil
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheck />
              Mon compte
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard />
              Facturation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut />
            Déconnexion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
