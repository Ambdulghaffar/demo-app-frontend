# Définition des Rôles et Permissions

Ce document définit les menus de navigation et les accès pour chaque rôle utilisateur dans l'application de gestion de stock.

---

## 1. Rôle : `Administrateur` (Super-Utilisateur)

L'administrateur a un accès total au système. Son rôle est de configurer l'application, de gérer les accès et de superviser l'ensemble de l'activité.

-   **Tableau de bord (`Dashboard`)**
    -   Vue d'ensemble globale : Chiffre d'affaires total, nombre de commandes, nouveaux clients, état du système.
    -   Rapports de haut niveau.

-   **Gestion des Utilisateurs (`Users`)**
    -   Liste de tous les utilisateurs (Admins, Managers, Clients).
    -   Créer, modifier, supprimer un utilisateur.
    -   **Gestion des Rôles & Permissions** : Définir ce que les autres rôles peuvent faire.

-   **Gestion du Catalogue (`Catalog`)**
    -   **Produits** : Ajouter, modifier, supprimer des produits.
    -   **Catégories** : Gérer l'arborescence des catégories de produits.
    -   **Fournisseurs** : Gérer la liste des fournisseurs.

-   **Gestion des Stocks (`Inventory`)**
    -   Vue globale de tous les stocks.
    -   Historique des mouvements de stock (entrées, sorties, ajustements).
    -   Gestion des entrepôts ou des emplacements de stockage.

-   **Gestion des Ventes (`Sales`)**
    -   Liste de toutes les commandes.
    -   Gestion des retours et des remboursements.
    -   Facturation et bons de livraison.

-   **Marketing**
    -   Gestion des promotions et des codes de réduction.
    -   Campagnes par e-mail.

-   **Paramètres du Système (`Settings`)**
    -   **Informations de l'entreprise** : Nom, adresse, TVA, etc.
    -   **Intégrations** : Configuration des paiements (Stripe, PayPal), des transporteurs (DHL, etc.).
    -   **Paramètres de sécurité** : Politique de mot de passe, authentification à deux facteurs.
    -   **Logs d'activité** : Journal de toutes les actions importantes effectuées sur le système.

---

## 2. Rôle : `Manager` (Gestionnaire Opérationnel)

Le manager gère les opérations quotidiennes. Il n'a pas besoin de configurer le système, mais il doit pouvoir gérer les stocks, les commandes et les clients.

-   **Tableau de bord (`Dashboard`)**
    -   Vue d'ensemble opérationnelle : Commandes à traiter, produits en rupture de stock, dernières ventes.

-   **Gestion des Stocks (`Inventory`)**
    -   État des stocks actuels.
    -   **Réception de marchandises** : Enregistrer les entrées de stock depuis les fournisseurs.
    -   **Ajustements de stock** : Corriger les quantités (ex: après un inventaire physique).
    -   Alertes de stock bas.

-   **Gestion des Ventes (`Sales`)**
    -   **Commandes à traiter** : Préparer et expédier les commandes des clients.
    -   Historique des commandes.
    -   Gestion des retours clients.

-   **Gestion des Clients (`Customers`)**
    -   Liste des clients.
    -   Voir l'historique d'un client spécifique.
    -   Support client (répondre aux questions).

-   **Rapports (`Reports`)**
    -   Rapport des ventes (par jour, par semaine, par produit).
    -   Rapport sur l'état des stocks.

---

## 3. Rôle : `Client` (Acheteur)

Le client n'a accès qu'à ses propres informations et aux actions qu'il peut effectuer sur le site public. Son "tableau de bord" est son espace personnel.

-   **Mon Compte (`My Account`)**
    -   Tableau de bord personnel : Résumé des dernières commandes, informations personnelles.

-   **Mes Commandes (`My Orders`)**
    -   Historique de toutes ses commandes passées.
    -   Suivi de la livraison pour les commandes en cours.
    -   Demander un retour.

-   **Mes Informations (`My Profile`)**
    -   Modifier son nom, son e-mail, son mot de passe.
    -   Gérer ses adresses de livraison et de facturation.

-   **Mes Préférences (`My Preferences`)**
    -   Gérer les abonnements à la newsletter.
    -   Paramètres de communication.

-   **Liste de Souhaits (`Wishlist`)**
    -   Voir et gérer les produits sauvegardés.

---

## Tableau Récapitulatif

| Fonctionnalité                | `Administrateur` | `Manager`      | `Client`        |
| :---------------------------- | :--------------: | :------------: | :-------------: |
| **Tableau de bord**           |      Global      |  Opérationnel  |    Personnel    |
| **Gestion Utilisateurs**      |     **Oui**      |      Non       |       Non       |
| **Gestion Rôles/Permissions** |     **Oui**      |      Non       |       Non       |
| **Gestion Produits/Catégories**|     **Oui**      | (Lecture seule)|       Non       |
| **Gestion Stocks**            |     **Oui**      |    **Oui**     |       Non       |
| **Gestion Commandes**         |     **Oui**      |    **Oui**     | (Ses commandes) |
| **Gestion Clients**           |     **Oui**      |    **Oui**     |   (Son profil)  |
| **Paramètres Système**        |     **Oui**      |      Non       |       Non       |
