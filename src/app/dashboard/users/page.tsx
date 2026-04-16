import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import ListUsers from "@/features/users/components/list-users";
import { getAllUsers } from "@/features/users/services/user.services";
import React from "react";

export default async function page() {
  const users = await getAllUsers();
  return (
    <>
      <SidebarBreadcrumb label={"Liste des utilisateurs"} />
      <ListUsers initialData={users} />
    </>
  );
}
