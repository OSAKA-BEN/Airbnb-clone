import { getCurrentUser } from "@/actions/getCurrentUser";
import ClientOnly from "@/components/ClientOnly";
import LoginModal from "@/components/LoginModal";
import Navbar from "@/components/Navbar";
import RegisterModal from "@/components/RegisterModal";
import RentModal from "@/components/RentModal";
import SearchModal from "@/components/SearchModal";
import ToasterProvider from "@/providers/ToasterProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "Find your dream home.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientOnly>
          <Navbar currentUser={currentUser} />
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
