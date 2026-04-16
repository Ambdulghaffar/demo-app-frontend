import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">Électro-Chic</h3>
            <p className="mt-2 text-sm text-gray-400">
              Nous nous concentrons sur la qualité, la performance et une expérience d&apos;achat transparente en laquelle vous pouvez avoir confiance.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Liens rapides</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Recherche
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Mon compte
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Commandes et retours
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Centre d&apos;aide
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Légal et politique</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Politique de remboursement
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Garantie et support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Informations de contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="text-gray-400">support@technova.com</li>
              <li className="text-gray-400">Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>&copy; 2026 Électro-Chic - Gadgets Premium. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
