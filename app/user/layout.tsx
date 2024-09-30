import type {Metadata} from "next";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";

import {Inter} from "next/font/google";
import "@styles/globals.css";
import {redirect} from "next/navigation";
const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Enterprise",
  description: "Procure e ache o zap de qualquer empresa ou micro empresa",
};

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/error?code=403");
  }

  return children;
}
