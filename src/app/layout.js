import { Navbar } from "./components/Navbar/Navbar";
import Background from "@/Background";
import Footer from "./components/Footer";

import "./globals.css";
import { figtree } from "./assets/fonts";

export const metadata = {
  title: "Atelier Pascaud",
  description: "Atelier de création céramique Pascaud",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/tab_logo.svg" type="image/svg" sizes="32x32" />
      </head>
      <body className={`${figtree.className} bg-terra-100 relative`}>
        <Background />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
