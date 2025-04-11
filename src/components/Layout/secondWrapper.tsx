"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";

const SecondWrapper = ({ children }: { children: React.ReactNode }) => {
  let pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  pathname = pathname.replace("/en/", "/");
  pathname = pathname.replace("/kn/", "/");

  console.log(session);

  if (pathname !== "/dashboard/jury" && session?.user.role === "JUDGE") {
    router.push("/dashboard/jury");
    return null;
  }

  return children;
};

export default SecondWrapper;
