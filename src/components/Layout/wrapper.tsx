'use client';

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Navbar from "~/components/Layout/navbar";
import Footer from "~/components/Layout/footer";
import { type Session } from "next-auth";
import { TRPCReactProvider } from "~/trpc/react";
import LocaleSwitcher from "~/components/Layout/localeSwitcher";

export default function SessionProviderWrapper({
    children,
    session
  }: {
    children: React.ReactNode,
    session: Session | null
  }) {
    const pathname = usePathname();

    return (
        <SessionProvider session={session}>
          <TRPCReactProvider>
            {pathname !== "/_error" && pathname !== "/dashboard/jury" && pathname !== "/dashboard/results" && <Navbar />}
            {/* <LocaleSwitcher /> */}
            {children}
            {pathname !== "/dashboard/jury" && pathname !== "/dashboard/results" && <Footer/>}
          </TRPCReactProvider>
        </SessionProvider>
    )
}