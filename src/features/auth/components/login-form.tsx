"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useState } from "react"; // Importer useState
import { Eye, EyeOff } from "lucide-react"; // Importer les icônes

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/route";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Votre email doit être unique.",
  }),
  password: z.string().min(8, {
    message: "Votre mot de passe doit contenir au moins 8 caractères.",
  }),
});

export function LoginForm() {
  const route = useRouter();
  // 1. Ajouter l'état pour la visibilité du mot de passe
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success("Connexion réussie !");
        route.push(ROUTES.DASHBOARD);
        form.reset();
      } else {
        toast.error("Email ou mot de passe invalide.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`Erreur: ${error.message}`);
    }
  }

  return (
    <div className="space-y-6">
      <Button
        className="w-full py-6 text-lg font-bold border-gray-600 bg-gray-400 hover:bg-gray-500"
      >
        <Image
          src="/images/google-icon.jpg"
          alt="Google"
          width={30}
          height={30}
          className="mr-2 rounded-full"
        />
        Se connecter avec Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continuer avec
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nom@exemple.com"
                    {...field}
                    className="py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Mot de passe</FormLabel>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm text-gray-500 hover:text-gray-600 underline"
                  >
                    Mot de passe oublié?
                  </Link>
                </div>
                {/* 2. Envelopper l'Input et l'icône dans un conteneur relatif */}
                <div className="relative">
                  <FormControl>
                    <Input
                      // 3. Changer le type en fonction de l'état
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      className="py-6 pr-10" // Ajouter un padding à droite pour l'icône
                    />
                  </FormControl>
                  {/* 4. Ajouter l'icône et le gestionnaire de clic */}
                  <div
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full py-6 text-lg bg-pink-500 hover:bg-pink-600 text-white"
          >
            Se connecter
          </Button>
        </form>
      </Form>
    </div>
  );
}