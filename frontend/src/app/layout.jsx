import "../styles/globals.css";
import { Montserrat } from "next/font/google";
import Navigation from "@/components/Navigation";
import { Toaster } from 'react-hot-toast';

//import Head from "next/head";

import { Administration } from "@/context/AdministrationContext";
//Tipo de letra
const inter = Montserrat({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://bootswatch.com/5/zephyr/bootstrap.min.css"
        />
      </head>
      <body className={inter.className}>
        <main>
          <header>
            <Navigation />
          </header>
          <div className="container p-4">
            <Toaster />
            <Administration>
             {children}
            </Administration>
          </div>
        </main>

      </body>
    </html>
  );
}
