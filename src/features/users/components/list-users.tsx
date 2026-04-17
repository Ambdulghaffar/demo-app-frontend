"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { PlusCircle, Search, ListFilter, Pen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserDto } from "@/features/users/types/user.types";
import { ROUTES } from "@/constants/route";
import { formatDate } from "@/utils/format-date";
import { truncateText } from "@/utils/truncate-text";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { deleteUserAction } from "../actions/user.actions";
import { toast } from "react-toastify";
import { ApiError } from "@/types/api.types";
import { Badge } from "@/components/ui/badge";

interface ListUsersProps {
  initialData: UserDto[];
}

export default function ListUsers({ initialData }: ListUsersProps) {
  const [data, setData] = useState<UserDto[]>(initialData);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const getBadgeClasses = (role: string) => {
    switch (role.toUpperCase()) {
      case "ADMIN":
        return "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300";
      case "MANAGER":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
      case "CLIENT":
      default:
        return "bg-gray-200 text-gray-700 dark:bg-gray-950 dark:text-gray-300";
    }
  };

  const handleDeleteUser = (userId: number) => {
    setDeletingId(userId);
    startTransition(async () => {
      // ✅ startTransition établit le bon contexte pour les Server Actions
      try {
        const result = await deleteUserAction(userId);
        if (result.success) {
          toast.success("Utilisateur supprimé avec succès !");
          setData((prev) => prev.filter((u) => u.id !== userId));
        } else {
          toast.error(result.error || "Erreur lors de la suppression");
        }
      } catch (error) {
        const message =
          error instanceof ApiError
            ? error.message
            : "Erreur lors de la suppression";
        toast.error(message);
      } finally {
        setDeletingId(null);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Utilisateurs</CardTitle>
        <CardDescription>
          Gérez les utilisateurs et leurs accès.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-8 w-full"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <ListFilter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrer par rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="MANAGER">Manager</SelectItem>
                <SelectItem value="CLIENT">Client</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            asChild
            size="sm"
            className="gap-1 bg-pink-600 hover:bg-pink-700"
          >
            <Link href={ROUTES.DASHBOARD_CREATE_USERS}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Ajouter un utilisateur
              </span>
            </Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom d&apos;utilisateur</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead className="hidden md:table-cell">
                Date de création
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.username}
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell title={user.address}>
                    {truncateText(user.address)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getBadgeClasses(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`${ROUTES.DASHBOARD_UPDATE_USERS}/${user.id}`}
                      >
                        <Pen color="blue" size={16} />
                      </Link>
                      <ConfirmationDialog
                        onConfirm={() => handleDeleteUser(user.id)}
                        disabled={isPending && deletingId === user.id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  Aucun utilisateur trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
