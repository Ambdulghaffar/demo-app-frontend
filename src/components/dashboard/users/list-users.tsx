"use client";
import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ListFilter, MoreHorizontal, Pen, Plus, Trash } from "lucide-react";
import { UserDto } from "@/lib/user/models/user.models";
import { deleteUser, getAllUsers } from "@/lib/user/services/user.services";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ROUTES } from "@/utils/route";

export default function ListUsers() {
  const [data, setData] = useState<UserDto[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const users = await getAllUsers();
    setData(users);
  };

  const handleDeleteUser = async (userId: number) => {
    const confirmDelete = confirm(
      "Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
    );
    if (!confirmDelete) return;
    try {
      await deleteUser(userId);
      toast.success(`Utilisateur ${userId} est supprimé avec succès !`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetchData(); // Rafraîchir la liste des utilisateurs après la suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      toast.error(
        "Une erreur est survenue lors de la suppression de l'utilisateur.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold mb-4">Liste des utilisateurs</h2>
        <div className="flex gap-4">
          <Button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white">
            <Link
              href={ROUTES.CREATE_USERS}
              className="flex items-center gap-2"
            >
              <Plus />
              Ajouter
            </Link>
          </Button>
          <Button className="flex items-center">
            <ListFilter />
            Filtrer par
          </Button>
        </div>
      </div>

      <Table className="">
        <TableCaption>
          Liste actuelle des utilisateurs enregistrés.
        </TableCaption>

        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="w-[50px] text-center">#</TableHead>
            <TableHead>Nom d’utilisateur</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="text-center font-medium">
                {user.id}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
              <TableCell className="ps-5">
                <ButtonActions userId={user.id} onDelete={handleDeleteUser} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ButtonActions({
  userId,
  onDelete,
}: {
  userId: number;
  onDelete: (id: number) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ps-2">
        <DropdownMenuItem className="text-blue-500">
          <Pen color="blue" />
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => onDelete(userId)}
        >
          <Trash color="red" />
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
