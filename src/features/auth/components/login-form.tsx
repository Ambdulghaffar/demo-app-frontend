"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

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
        className="w-full py-6 text-lg border-black hover:bg-gray-300 cursor-pointer"
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
          <span className="bg-white px-2 text-muted-foreground">
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
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    className="py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full py-6 text-lg bg-pink-400 hover:bg-pink-500 cursor-pointer"
          >
            Se connecter
          </Button>
        </form>
      </Form>
    </div>
  );
}
