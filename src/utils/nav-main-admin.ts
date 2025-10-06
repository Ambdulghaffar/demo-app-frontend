import {
  LayoutDashboard,
  Users,
  School,
  FileSpreadsheet,
  ClipboardList,
  Settings2,
} from "lucide-react";
import { ROUTES } from "./route";

export const NavMainAdmin = [
  {
    title: "Tableau de bord",
    icon: LayoutDashboard,
    url: ROUTES.DASHBOARD
  },
  {
    title: "Utilisateurs",
    url: "#",
    icon: Users,
    isActive: true,
    items: [
      {
        title: "Liste des utilisateurs",
        url: ROUTES.DASHBOARD_USERS,
      },
      {
        title: "Ajouter un utilisateur",
        url: ROUTES.DASHBOARD_CREATE_USERS,
      },
      {
        title: "Rôles & permissions",
        url: "#",
      },
      {
        title: "Historique des connexions",
        url: "#",
      },
    ],
  },
  {
    title: "Classes",
    url: "#",
    icon: School,
    items: [
      {
        title: "Liste des classes",
        url: "#",
      },
      {
        title: "Créer une classe",
        url: "#",
      },
      {
        title: "Affecter les élèves",
        url: "#",
      },
      {
        title: "Emploi du temps",
        url: "#",
      },
    ],
  },
  {
    title: "Matières",
    url: "#",
    icon: FileSpreadsheet,
    items: [
      {
        title: "Liste des matières",
        url: "#",
      },
      {
        title: "Ajouter une matière",
        url: "#",
      },
      {
        title: "Affecter aux professeurs",
        url: "#",
      },
    ],
  },
  {
    title: "Notes",
    url: "#",
    icon: ClipboardList,
    items: [
      {
        title: "Toutes les notes",
        url: "#",
      },
      {
        title: "Ajouter des notes",
        url: "#",
      },
      {
        title: "Statistiques / Moyennes",
        url: "#",
      },
    ],
  },
  {
    title: "Paramètres",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "Informations de l’école",
        url: "#",
      },
      {
        title: "Équipe administrative",
        url: "#",
      },
      {
        title: "Sécurité & accès",
        url: "#",
      },
    ],
  },
];
