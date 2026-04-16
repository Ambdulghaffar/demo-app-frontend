"use client";

import React, { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { Pen, Plus, ListFilter } from "lucide-react";
import Link from "next/link";

import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { ROUTES } from "@/constants/route";
import { ApiError } from "@/types/api.types";
import { deleteUserAction } from "@/features/users/actions/user.actions";
import type { UserDto } from "@/features/users/types/user.types";

interface ListUsersProps {
  initialData: UserDto[];
}

export default function ListUsers({ initialData }: ListUsersProps) {
  const [data, setData] = useState<UserDto[]>(initialData);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Liste des utilisateurs</h2>
        <div className="flex gap-4">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href={ROUTES.DASHBOARD_CREATE_USERS} className="flex items-center gap-2">
              <Plus size={16} />
              Ajouter
            </Link>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <ListFilter size={16} />
            Filtrer par
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>Liste actuelle des utilisateurs enregistrés.</TableCaption>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="w-[50px] text-center">#</TableHead>
            <TableHead>Nom d&apos;utilisateur</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-10">
                Aucun utilisateur trouvé.
              </TableCell>
            </TableRow>
          ) : (
            data.map((user) => (
              <TableRow
                key={user.id}
                className={deletingId === user.id ? "opacity-50 pointer-events-none" : ""}
              >
                <TableCell className="text-center font-medium">{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Link href={`${ROUTES.DASHBOARD_UPDATE_USERS}/${user.id}`}>
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
          )}
        </TableBody>
      </Table>
    </div>
  );
}