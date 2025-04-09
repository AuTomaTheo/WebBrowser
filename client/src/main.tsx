import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import fonts
const fontLinks = [
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lato:wght@300;400;700&family=Dancing+Script:wght@400;500;600&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
];

// Dynamically add font links to the document head
fontLinks.forEach(href => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
});

// Add page title and favicon
const title = document.createElement('title');
title.textContent = 'Milk & Honey - Florărie și Design Floral';
document.head.appendChild(title);

createRoot(document.getElementById("root")!).render(<App />);
