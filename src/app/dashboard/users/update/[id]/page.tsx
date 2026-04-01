import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import EditUser from "@/features/users/components/edit-user";
import { getUserById } from "@/features/users/services/user.services";
import React from "react";
import NotFound from "./not-found";

export default async function page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const user = await getUserById(id);
  if (!user) {
    return <NotFound/>
  }
  return (
    <>
      <SidebarBreadcrumb label="Editer" />
      <EditUser editUser={{ ...user, password: "" }} />
    </>
  );
}
