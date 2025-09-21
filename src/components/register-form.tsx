"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email(),
  phone: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
    
    {/* Nom complet */}
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nom complet</FormLabel>
          <FormControl>
            <Input placeholder="Votre nom complet" {...field} />
          </FormControl>
          <FormDescription>Entrez votre nom et prénom.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Email */}
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="exemple@domaine.com" {...field} />
          </FormControl>
          <FormDescription>Nous utiliserons cet email pour vous contacter.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Mot de passe */}
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Mot de passe</FormLabel>
          <FormControl>
            <Input type="password" placeholder="••••••••" {...field} />
          </FormControl>
          <FormDescription>Choisissez un mot de passe sécurisé.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Téléphone */}
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Téléphone</FormLabel>
          <FormControl>
            <Input type="tel" placeholder="0123456789" {...field} />
          </FormControl>
          <FormDescription>Entrez votre numéro de téléphone.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Adresse */}
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Adresse</FormLabel>
          <FormControl>
            <Input placeholder="Adresse complète" {...field} />
          </FormControl>
          <FormDescription>Entrez votre adresse complète.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

    <Button type="submit">S&apos;inscrire</Button>
  </form>
</Form>

  );
}
