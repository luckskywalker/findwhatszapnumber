import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Nav} from "@/components";

import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";

import "@/styles/globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Ache o ZAP",
  description: "Procure e ache o zap de qualquer empresa ou micro empresa",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav.Main />
        {children}
        <div className="h-16">
          {
            session ?
              <Nav.Bottom />
              : null
          }
        </div>
      </body>
    </html>
  );
}
