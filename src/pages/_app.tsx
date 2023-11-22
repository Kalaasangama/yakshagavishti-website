import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Navbar from "~/components/Layout/navbar";
import Footer from "~/components/Layout/footer";
import Head from "next/head";
// import { useEffect, useState } from "react";

import { api } from "~/utils/api";
import "~/styles/globals.css";
import { useRouter } from "next/router";
import localFont from 'next/font/local'

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

const rhomdon = localFont({
  src: '../../public/fonts/Rhomdon/Rhomdon/Rhomdon.otf',
  display: 'swap',
  variable: '--font-rhomdon'
})

const boris = localFont({
  src: '../../public/fonts/Boris/Boris/Boris - Free/Boris.otf',
  display: 'swap',
  variable: '--font-boris'
})

const oskari = localFont({
  src: '../../public/fonts/Oskari/Oskari/oskari.otf',
  display: 'swap',
  variable: '--font-oskari'
})

const porpora = localFont({
  src: '../../public/fonts/Porpora/Porpora/Porpora/web/Porpora-Regular.woff2',
  display: 'swap',
  variable: '--font-porpora'
})

import "~/styles/dropzone.css"
import { Toaster } from 'react-hot-toast';


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const path = useRouter()

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${balooChettan2.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={session}>
        <Head>
          <title>Yakshagavishti</title>
          <meta name="description" content="Yakshagavishti" />
          <meta name="description" content="Presenting Yakshagavishti - 2023, an Inter-College Yakshagana competition by Nitte University and NMAM Institute of Technology, as we celebrate the fusion of technology, cultural traditions, and artistic innovation. Welcome art enthusiasts for a unique experience!" key="desc" />
          <meta property="og:title" content="Yakshagavishti" />
          <meta
          property="og:description"
          content="Presenting Yakshagavishti - 2023, an Inter-College Yakshagana competition by Nitte University and NMAM Institute of Technology, as we celebrate the fusion of technology, cultural traditions, and artistic innovation. Welcome art enthusiasts for a unique experience!"
          />
          <meta property="og:url" content="https://www.yakshagavishti.in/" />
          <meta property="og:site_name" content="Yakshagavishti" />
          <meta property="og:type" content="website" />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="527" />
          <meta property="og:image:alt" content="Yakshagavishti" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image" itemProp="image" content="/logo.png"  />
          <meta property="og:image:secure_url" itemProp="image" content="/logo.png"  />
          <link rel="icon" href="/logo.png" type="images/png" sizes="64x64"/>
          <meta property="og:type" content="website" />
        </Head>
        {/* { loading && <Loader /> } */}
          <main className={`${balooChettan2.variable} ${porpora.variable} ${oskari.variable} ${boris.variable} ${rhomdon.variable} font-sans mx-auto text-white selection:bg-secondary-200 selection:text-white`}>
            {path.pathname !== "/_error" && path.pathname !== "/dashboard/jury" && path.pathname !== "/dashboard/results" && <Navbar />}
            <Component {...pageProps} />
            <Toaster />
            {path.pathname !== "/dashboard/jury" && <Footer/>}
          </main>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
