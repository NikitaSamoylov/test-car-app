import type { Metadata } from "next";
import { Header } from "@/components/Header";
import SessionProvider from "@/utils/SessionProvider";
import { getServerSession } from "next-auth";
import { Roboto } from "next/font/google";
import '../../styles/globals.scss';

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car App",
  description: "Car App",
};

export default function RootLayout({
  children,
}: React.PropsWithChildren<{
  children: React.ReactNode
}>) {
  const session = getServerSession();

  return (
    <html lang="en">
      <body className={`${roboto}`}>
        <SessionProvider session={session}>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
