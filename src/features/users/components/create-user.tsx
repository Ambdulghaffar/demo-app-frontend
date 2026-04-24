"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { createUserAction } from "@/features/users/actions/user.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/route";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Le nom d'utilisateur doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  phone: z
    .string()
    .min(10, {
      message: "Le numéro de téléphone doit contenir au moins 10 chiffres.",
    })
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      {
        message: "Veuillez entrer un numéro de téléphone valide.",
      },
    ),
  address: z.string().min(2, {
    message: "L'adresse doit contenir au moins 2 caractères.",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères.",
  }),
  role: z.enum(["ADMIN", "MANAGER", "CLIENT"]),
});

export default function CreateUser() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      role: "CLIENT",
    },
  });

  // Soumission du formulaire
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await createUserAction(values);
      if (result.success) {
        toast.success(`Utilisateur ajouté avec succès !`);
        router.push(ROUTES.DASHBOARD_USERS);
        form.reset();
      } else {
        toast.error(
          `Erreur lors de l'ajout de l'utilisateur : ${result.error}`,
        );
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erreur inconnue";
      toast.error(`Erreur lors de l'ajout de l'utilisateur : ${message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Ajouter un utilisateur
            </h2>
            <p className="text-gray-600">
              Créez un nouveau compte utilisateur pour votre boutique
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6">
              <h3 className="text-white text-xl font-semibold">
                Informations utilisateur
              </h3>
              <p className="text-pink-100 text-sm">
                Remplissez tous les champs requis
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-8 space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Nom d&apos;utilisateur
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: john_doe"
                            {...field}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Choisissez un nom d&apos;utilisateur unique.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Adresse email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="exemple@email.com"
                            {...field}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Une adresse email valide est requise.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Numéro de téléphone
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+212600000000"
                            {...field}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Format international recommandé.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Adresse complète
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Rue, ville, pays"
                            {...field}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Adresse de livraison et facturation.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Mot de passe
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                            className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Minimum 8 caractères avec lettres et chiffres.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Rôle utilisateur
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="py-3 bg-gray-50 border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-colors">
                              <SelectValue placeholder="Sélectionnez un rôle" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-gray-200">
                            <SelectItem
                              value="CLIENT"
                              className="hover:bg-pink-50"
                            >
                              Client
                            </SelectItem>
                            <SelectItem
                              value="MANAGER"
                              className="hover:bg-pink-50"
                            >
                              Manager
                            </SelectItem>
                            <SelectItem
                              value="ADMIN"
                              className="hover:bg-pink-50"
                            >
                              Administrateur
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-gray-500">
                          Détermine les permissions de l&apos;utilisateur.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                  <Button
                    type="reset"
                    variant="outline"
                    onClick={() => form.reset()}
                    className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    Réinitialiser
                  </Button>
                  <Button
                    type="submit"
                    className="px-8 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-medium cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <span>Créer l&apos;utilisateur</span>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
