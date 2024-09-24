import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import SessionProvider from "@/utils/SessionProvider";
import '../styles/globals.scss';
import { getServerSession } from "next-auth";

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
  title: "Car App",
  description: "Car App",
};

export default function RootLayout({
  children,
}: React.PropsWithChildren<{
  children: React.ReactNode;
}>) {
  const session = getServerSession();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider session={session}>
          <Header/>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
