import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import EditUser from "@/features/users/components/edit-user";
import { getUserById } from "@/features/users/services/user.services";
import { notFound } from "next/navigation";
import React from "react";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await getUserById(Number(id));

  if (!user) {
    notFound();
  }
  return (
    <>
      <SidebarBreadcrumb label="Editer" />
      <EditUser editUser={{ ...user }} />
    </>
  );
}
