"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Trash } from "lucide-react";

type ConfirmationDialogProps = {
  onConfirm: () => void;
};

export default function ConfirmationDialog({
  onConfirm,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash color="red" size={16} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous absolument sûr&nbsp;?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Elle supprimera définitivement votre
            compte et effacera vos données de nos serveurs.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continuer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
