import type { Metadata } from "next";
import localFont from "next/font/local";
import { getCurrentUser } from "./actions/getCurrentUser";
import LoginModal from "./components/LoginModal";
import Navbar from "./components/Navbar";
import RegisterModal from "./components/RegisterModal";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
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
        <Navbar currentUser={currentUser} />
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        {children}
      </body>
    </html>
  );
}
