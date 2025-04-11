"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Navbar from "~/components/Layout/navbar";
import Footer from "~/components/Layout/footer";
import { type Session } from "next-auth";
import { TRPCReactProvider } from "~/trpc/react";

export default function SessionProviderWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  let pathname = usePathname();

  pathname = pathname.replace("/en/", "/");
  pathname = pathname.replace("/kn/", "/");

  return (
    <SessionProvider session={session}>
      <TRPCReactProvider>
        {pathname !== "/_error" &&
          pathname !== "/dashboard/jury" &&
          pathname !== "/dashboard/results" && <Navbar />}
        {children}
        {pathname !== "/dashboard/jury" &&
          pathname !== "/dashboard/results" && <Footer />}
      </TRPCReactProvider>
    </SessionProvider>
  );
}
