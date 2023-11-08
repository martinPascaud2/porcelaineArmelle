import { Navbar } from "./components/Navbar/Navbar";
import Background from "@/Background";

import "./globals.css";
import { inter } from "./assets/fonts";

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
      <body className={`${inter.className} bg-terra-100 relative`}>
        <Background />
        <Navbar className="" />
        {children}
        <div>Footer</div>
      </body>
    </html>
  );
}
