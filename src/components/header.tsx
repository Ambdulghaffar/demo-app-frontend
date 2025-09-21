import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ModeToggle from "./mode-toggle";
import Link from "next/link";

export default function Header() {
  return (
    <Card className="px-10">
      <CardHeader>
        <CardTitle className="flex gap-8 items-center">
          <Link href="/">Acceuil</Link>
          <Link href="/register">Inscription</Link>
          <Link href="/login">Connexion</Link>
          <Link href="/contact">Contact</Link>
        </CardTitle>
        <CardDescription className="mt-4">
          Bienvenue sur notre plateforme ! Ici, vous pouvez créer un compte,
          vous connecter et accéder à nos fonctionnalités.
        </CardDescription>
        <CardAction>
          <ModeToggle />
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>
          Découvrez nos services et profitez d’une expérience personnalisée.
          Inscrivez-vous dès maintenant pour bénéficier de toutes les
          fonctionnalités disponibles.
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>Gestion de compte facile</li>
          <li>Accès sécurisé à vos données</li>
          <li>Support et assistance disponibles 24/7</li>
        </ul>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          © 2025 MonApplication. Tous droits réservés. Suivez-nous sur nos réseaux sociaux pour rester informé des nouveautés.
        </p>
      </CardFooter>
    </Card>
  );
}
