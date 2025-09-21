"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Mail, Phone, MapPin } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Veuillez entrer au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer un email valide." }),
  message: z.string().min(5, { message: "Votre message doit contenir au moins 5 caractères." }),
});

export default function ContactPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Message envoyé !", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="grid md:grid-cols-2 gap-10 p-10">
      {/* FORMULAIRE */}
      <div>
        <h1 className="text-2xl font-bold mb-6">Contactez-nous</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Nom */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom complet" {...field} />
                  </FormControl>
                  <FormDescription>Entrez votre nom complet.</FormDescription>
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
                    <Input placeholder="exemple@domaine.com" {...field} />
                  </FormControl>
                  <FormDescription>Nous vous répondrons sur cet email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Votre message..." {...field} />
                  </FormControl>
                  <FormDescription>Écrivez votre message ou question.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Envoyer</Button>
          </form>
        </Form>
      </div>

      {/* INFORMATIONS DE CONTACT */}
      <div className="bg-muted rounded-2xl p-6 flex flex-col space-y-6 shadow-md">
        <h2 className="text-xl font-semibold">Nos coordonnées</h2>
        <p className="text-muted-foreground">
          Vous pouvez nous joindre directement via les informations ci-dessous :
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            <span>+261 34 12 345 67</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <span>contact@monentreprise.com</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <span>123 Rue Mutsamudu, Anjouan, Comores</span>
          </div>
        </div>
      </div>
    </div>
  );
}
