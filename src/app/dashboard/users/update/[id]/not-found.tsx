import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ROUTES } from "@/utils/route";
import { AlertCircleIcon, ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="grid w-full max-w-lg mx-auto mt-20 items-start gap-4">
      <Alert variant="destructive" className="flex items-start gap-3">
        <AlertCircleIcon className="h-5 w-5 mt-1 text-red-600" />
        <div>
          <AlertTitle>Utilisateur introuvable</AlertTitle>
          <AlertDescription>
            <p className="mt-1 text-sm text-muted-foreground">
              L’utilisateur que vous tentez de modifier n’existe pas ou a été
              supprimé.
            </p>
            <ul className="list-inside list-disc text-sm mt-2 space-y-1">
              <li>Vérifiez l’identifiant de l’utilisateur dans l’URL.</li>
              <li>Assurez-vous que l’utilisateur est toujours actif.</li>
              <li>Contactez l’administrateur si le problème persiste.</li>
            </ul>
            <div className="mt-4">
              <Link
                href={ROUTES.DASHBOARD_USERS}
                className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
              >
                <ArrowBigLeft size={14} />
                <span>Retour à la liste des utilisateurs</span>
              </Link>
            </div>
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
