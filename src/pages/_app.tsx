import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Navbar from "~/components/Layout/navbar";
import Footer from "~/components/Layout/footer";

import { api } from "~/utils/api";
import "~/styles/globals.css";
import { useRouter } from "next/router";
import localFont from 'next/font/local'
import { Tourney } from "next/font/google"

const tourney = Tourney({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-tourney',
  weight: ['700', '800', '900']
})

const balooChettan2 = localFont({
  src: [
    {
      path: '../../public/fonts/BalooChettan2/BalooChettan2-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../public/fonts/BalooChettan2/BalooChettan2-ExtraBold.woff2',
      weight: '800',
      style: 'normal'
    },
    {
      path: '../../public/fonts/BalooChettan2/BalooChettan2-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/BalooChettan2/BalooChettan2-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/BalooChettan2/BalooChettan2-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
  ],
  display: 'swap',
  variable: '--font-baloo'
})

const samarkan = localFont({
  src: '../../public/fonts/Samarkan/SamarkanNormal.woff2',
  display: 'swap',
  variable: '--font-hindi'
})
import "~/styles/dropzone.css"
import { Toaster } from "src/components/ui/toaster"


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const path = useRouter()

  return (
    <SessionProvider session={session}>
      <main className={`${balooChettan2.variable} ${samarkan.variable} ${tourney.variable} font-sans mx-auto text-white selection:bg-secondary-200 selection:text-white`}>
        {path.pathname !== "/_error" && <Navbar />}
        <Component {...pageProps} />
        <Toaster />
        <Footer />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
