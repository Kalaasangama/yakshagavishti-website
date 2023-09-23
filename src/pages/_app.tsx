import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
// import Navbar from "~/components/navbar";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useRouter } from "next/router";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const path = useRouter()

  return (
    <SessionProvider session={session}>
      {path.pathname !== "/_error" && <Navbar />}
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
