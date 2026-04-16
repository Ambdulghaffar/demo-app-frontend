"use client";
import React from "react";
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
import { updateUserAction } from "@/features/users/actions/user.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/route";
import { User } from "@/features/users/types/user.types";
import { Loader2 } from "lucide-react";

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
  role: z.enum(["ADMIN", "MANAGER", "CLIENT"]),
});

interface EditUserProps {
  editUser: User;
}

export default function EditUser({ editUser }: EditUserProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: editUser.username,
      email: editUser.email,
      phone: editUser.phone,
      address: editUser.address,
      role: editUser.role,
    },
  });

  // Soumission du formulaire
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const result = await updateUserAction({ id: editUser.id, ...values });
      if (result.success) {
        toast.success(`Informations modifiées avec succès !`);
        router.push(ROUTES.DASHBOARD_USERS);
        form.reset();
      } else {
        toast.error(`Erreur lors de la modification : ${result.error}`);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erreur inconnue";
      toast.error(`Erreur lors de la modification : ${message}`);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Editer un utilisateur</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-muted/40 p-6 rounded-xl shadow-sm"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez le nom complet de l&lsquo;utilisateur.
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="exemple@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Entrez une adresse email valide.
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
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+212600000000" {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez le numéro de téléphone de l’utilisateur.
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
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="Rue, ville, pays" {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez l’adresse de l’utilisateur.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rôle</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un rôle" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CLIENT">Client</SelectItem>
                    <SelectItem value="MANAGER">Manager</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choisissez le rôle de l&apos;utilisateur.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="reset"
              variant="outline"
              onClick={() => form.reset()}
              className="cursor-pointer"
            >
              Réinitialiser
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            >
              <span>Modifer</span>
              {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
