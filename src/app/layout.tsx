import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar";
import {ReduxProvider} from "@/redux/provider";
import {useReadLocalStorage} from "usehooks-ts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={inter.className}>
          <header className='relative mx-auto max-w-7xl h-16 flex justify-between items-center px-4 sm:px-6 lg:px-8'>
            <Navbar />
          </header>
          <main>
            {children}
          </main>
        </body>
      </ReduxProvider>
    </html>
  );
}
