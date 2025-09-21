import React from "react";
import { Card, CardAction, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import ModeToggle from "./mode-toggle";

export default function PageLayout({children}:{children: React.ReactNode}) {
  return (
    <Card className="px-10">
      <CardHeader>
        <CardTitle className="flex gap-8 items-center">
          <Link href="/">Acceuil</Link>
          <Link href="/register">Inscription</Link>
          <Link href="/login">Connexion</Link>
          <Link href="/contact">Contact</Link>
        </CardTitle>
        <CardAction>
          <ModeToggle />
        </CardAction>
      </CardHeader>
      <div className="px-8">
        {children}
      </div>
    </Card>
  );
}
