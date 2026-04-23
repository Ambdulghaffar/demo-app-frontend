import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import ListUsers from "@/features/users/components/list-users";
import { getAllUsers } from "@/features/users/services/user.services";
import { authOptions } from "@/lib/auth/auth";
import { getServerSession } from "next-auth";

interface UsersPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
    sortBy?: string;
    sortDir?: string;
  }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const { page, size, sortBy, sortDir } = await searchParams;

  const session = await getServerSession(authOptions);

  const data = await getAllUsers(
    Number(page) || 0,
    Number(size) || 10,
    sortBy || "id",
    sortDir || "desc",
  );

  // Filtrer l'utilisateur connecté côté serveur
  const filteredContent = data.content.filter(
    (user) => user.email !== session?.user?.email,
  );

  return (
    <>
      <SidebarBreadcrumb label="Liste des utilisateurs" />
      <ListUsers
        initialData={{ ...data, content: filteredContent }}
        currentPage={Number(page) || 0}
      />
    </>
  );
}