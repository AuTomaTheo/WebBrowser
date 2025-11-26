// Import images
import {
  nuntiSibotezuriPath,
  buchetePerzonalizatePath,
  
} from "../assets/images";

// Categories data
export const categories = [
  {
    id: 1,
    title: "Nunti si botezuri",
    romanianTitle: "Nunti si boteze",
    image: nuntiSibotezuriPath,
    link: "/event-planning",
  },
  /* Commented out per user request
  {
    id: 2,
    title: "Buchete personalizate",
    romanianTitle: "Buchete personalizate",
    image: buchetePerzonalizatePath,
    link: "/rentals",
  },
  */
  {
    id: 3,
    title: "Aranjamente florale",
    romanianTitle: "Aranjamente florale",
    image: buchetePerzonalizatePath,
    link: "/contact",
  },
  {
    id: 4,
    title: "Workshops",
    romanianTitle: "Workshops",
    image: buchetePerzonalizatePath,
    link: "/workshops",
  },
];

// Service highlights
export const serviceHighlights = [
  {
    id: 1,
    icon: "gift",
    title: "Design Unic",
    description:
      "Personalizăm povestea fiecărui eveniment important din viața ta.",
  },
  {
    id: 2,
    icon: "cut",
    title: "Atelier Propriu",
    description:
      "Realizăm și punem la dispoziția ta elemente de recuzită unice.",
  },
  {
    id: 3,
    icon: "truck",
    title: "Livrăm la ușa ta",
    description: "În București și Ilfov, în condiții de maximă siguranță.",
  },
  {
    id: 4,
    icon: "glasses",
    title: "Atenție la detalii",
    description: "Împachetăm produsele cu multă grijă, atenție la detalii.",
  },
];

// Popular categories
export const popularCategories = [
  {
    id: 1,
    title: "BUCHETE DE FLORI",
    image:
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    link: "/contact",
  },
  {
    id: 2,
    title: "ARANJAMENTE FLORALE",
    image:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    link: "/contact",
  },
  {
    id: 3,
    title: "PLANTE DE INTERIOR",
    image:
      "https://images.unsplash.com/photo-1463320898484-cdee8141c787?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    link: "/contact",
  },
  {
    id: 4,
    title: "WORKSHOPS FLORALE",
    image:
      "https://images.unsplash.com/photo-1464699908537-0954e50791ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    link: "/workshops",
  },
];

// Navigation links
export const navLinks = [
  { id: 1, title: "HOME", path: "/" },
  { id: 2, title: "DESPRE NOI", path: "/despre-noi" },
  { id: 3, title: "SERVICII", path: "/servicii" },
  { id: 4, title: "GALERIE", path: "/galerie" },
  { id: 5, title: "TESTIMONIALE", path: "/testimoniale" },
  { id: 6, title: "CONTACT", path: "/contact" },
];

// Footer quick links
export const quickLinks = [
  { id: 1, title: "Despre noi", path: "/despre-noi" },
  { id: 2, title: "Servicii", path: "/servicii" },
  { id: 3, title: "Galerie", path: "/galerie" },
  { id: 4, title: "Testimoniale", path: "/testimoniale" },
  { id: 5, title: "Contact", path: "/contact" },
];

// Footer services links
export const serviceLinks = [
  { id: 1, title: "Decoruri de eveniment", path: "/servicii" },
  { id: 2, title: "Aranjamente florale", path: "/servicii" },
  { id: 3, title: "Închirieri", path: "/servicii" },
  { id: 4, title: "Workshops", path: "/servicii" },
  { id: 5, title: "Galerie", path: "/galerie" },
];

// Footer account links - commented out per user request
// export const accountLinks = [
//   { id: 1, title: "Autentificare", path: "/auth" },
//   { id: 3, title: "Favorite", path: "/wishlist" },
//   { id: 6, title: "Profil", path: "/profile" },
//   { id: 7, title: "Contact", path: "/contact" },
// ];
