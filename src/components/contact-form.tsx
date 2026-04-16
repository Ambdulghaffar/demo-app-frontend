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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


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
    <div className="min-h-screen">
      <div className="bg-white p-10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Section de gauche : Titre et description */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-800">
              Discutons.
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Nous sommes là pour répondre à toutes vos questions. Remplissez le
              formulaire et nous reviendrons vers vous rapidement.
            </p>
          </div>

          {/* Section de droite : Formulaire */}
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Nom */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Nom complet
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Votre nom"
                          {...field}
                          className="py-6 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500"
                        />
                      </FormControl>
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
                      <FormLabel className="text-gray-600">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="exemple@domaine.com"
                          {...field}
                          className="py-6 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500"
                        />
                      </FormControl>
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
                      <FormLabel className="text-gray-600">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Votre message..."
                          {...field}
                          className="min-h-[120px] bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full py-6 text-lg bg-pink-500 hover:bg-pink-600 text-white rounded-xl curosor-pointer"
                >
                  Envoyer le message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
