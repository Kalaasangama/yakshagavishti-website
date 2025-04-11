import "~/styles/globals.css";

import { type Metadata } from "next";
import localFont from "next/font/local";

import type { Session } from "next-auth";
import SessionProviderWrapper from "~/components/Layout/wrapper";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "~/i18n/routing";
import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";
import SecondWrapper from "~/components/Layout/secondWrapper";

export const metadata: Metadata = {
  title: "Yakshagavishti",
  description:
    "Presenting Yakshagavishti - 2023, an Inter-College Yakshagana competition by Nitte University and NMAM Institute of Technology, as we celebrate the fusion of technology, cultural traditions, and artistic innovation. Welcome art enthusiasts for a unique experience!",
  openGraph: {
    type: "website",
    title: "Yakshagavishti",
    description:
      "Presenting Yakshagavishti - 2023, an Inter-College Yakshagana competition by Nitte University and NMAM Institute of Technology, as we celebrate the fusion of technology, cultural traditions, and artistic innovation. Welcome art enthusiasts for a unique experience!",
    url: "https://www.yakshagavishti.in/",
    siteName: "Yakshagavishti",
    images: [
      {
        url: "logo.png",
        width: 800,
        height: 527,
        alt: "Yakshagavishti",
        type: "image/png",
        secureUrl: "logo.png",
      },
    ],
  },
};

const balooChettan2 = localFont({
  src: [
    {
      path: "../../../public/fonts/BalooChettan2/BalooChettan2-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/BalooChettan2/BalooChettan2-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/fonts/BalooChettan2/BalooChettan2-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/BalooChettan2/BalooChettan2-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/BalooChettan2/BalooChettan2-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-baloo",
});

const rhomdon = localFont({
  src: "../../../public/fonts/Rhomdon/Rhomdon/Rhomdon.otf",
  display: "swap",
  variable: "--font-rhomdon",
});
const boris = localFont({
  src: "../../../public/fonts/Boris/Boris/Boris - Free/Boris.otf",
  display: "swap",
  variable: "--font-boris",
});
const oskari = localFont({
  src: "../../../public/fonts/Oskari/Oskari/oskari.otf",
  display: "swap",
  variable: "--font-oskari",
});
const porpora = localFont({
  src: "../../../public/fonts/Porpora/Porpora/Porpora/web/Porpora-Regular.woff2",
  display: "swap",
  variable: "--font-porpora",
});

export default async function RootLayout({
  children,
  session,
  params,
}: Readonly<{
  children: React.ReactNode;
  session: Session | null;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${balooChettan2.variable} ${porpora.variable} ${oskari.variable} ${boris.variable} ${rhomdon.variable}`}
    >
      <body className="x-auto text-white selection:bg-secondary-200 selection:text-white">
        <NextIntlClientProvider locale={locale}>
          <SessionProviderWrapper session={session}>
            <SecondWrapper>
              {children}
              <Toaster />
            </SecondWrapper>
          </SessionProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
