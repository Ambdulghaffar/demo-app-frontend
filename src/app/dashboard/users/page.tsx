import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import ListUsers from "@/features/users/components/list-users";
import { getAllUsers } from "@/features/users/services/user.services";
import { authOptions } from "@/lib/auth/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  const users = await getAllUsers();

  // Filtrer l'utilisateur connecté de la liste côté serveur
  const filteredUsers = users.filter(
    (user) => user.email !== session?.user?.email,
  );

  return (
    <>
      <SidebarBreadcrumb label={"Liste des utilisateurs"} />
      <ListUsers initialData={filteredUsers} />
    </>
  );
}
