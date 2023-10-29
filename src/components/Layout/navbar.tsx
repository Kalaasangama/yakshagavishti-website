import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { SmallButton } from "../Button";
import Reveal from "../Animations/reveal";
import LanguageDropdown from "./dropDown";
import { signIn, signOut, useSession } from "next-auth/react";
import en from "~/locale/en/navbar";
import kn from "~/locale/kn/navbar";




type Link = {
  label: string;
  url: string;
};

type Props = {
  links: Link[];
  activePath: Link;
};

const Navbar = () => {
  const { data: sessionData } = useSession();

  const links = [
    { id: "Home", label: "Home", url: "/" },
    { id: "Sponsors", label: "Sponsors", url: "/sponsors" },
    { id: "Achievements", label: "Achievements", url: "/achievements" },
    { id: "About", label: "About Us", url: "/about" },
  ];

  const router = useRouter();

  const t = router.locale === "en" ? en : kn

  // Need to find the active page...
  const activePaths = links.filter((link) => link.url === router.pathname);
  // Idk to implement, thus doing in alternate hack... Typescript throwing error if directly used links.find()
  const activePath = activePaths[0] ? activePaths[0] : { label: "", url: "" };

  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <nav className="fixed top-2 z-50 font-medium w-full max-w-screen-2xl">
      <div className="flex flex-col backdrop-blur-md border-b border-orange-300 rounded-3xl px-5 text-white text-xs sm:text-sm md:text-base xl:text-lg mx-3 sm:mx-7 lg:mx-28 py-2 sm:py-4 2xl:py-6">
        <div className="flex justify-between items-center">
          <Reveal classes="">
            <div  className="flex items-center justify-start">
              <Link href={'/'}>
                <Image
                  src={"/logo-copy.png"}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="object-contain object-left relative w-[4.5rem] md:w-20 lg:w-[5.25rem] 2xl:w-36"
                />
              </Link>
            </div>
          </Reveal>
          <div className="hidden space-x-7 lg:flex 2xl:text-2xl">
            {links.map((link, idx) => {
              return (
                <Reveal key={idx} classes="">
                  <Link
                    className="flex items-center"
                    href={link.url}
                  >
                    <div
                      className={
                        activePath?.label === link.label
                          ? "text-secondary-100"
                          : "hover:text-secondary-200 tranition ease-linear duration-150"
                      }
                    >
                      {t[link.id as keyof typeof t]}
                    </div>
                  </Link>
                </Reveal>
              );
            })}
            <Reveal classes="">
              <LanguageDropdown t={{lang: t.lang, kan: t.kan, eng: t.eng}}></LanguageDropdown>
            </Reveal>
          </div>
          <div className="flex gap-5">
            <Reveal classes="hidden lg:block">
              <div className="" onClick={sessionData ? () => void signOut() : () => void signIn("auth0")}>
                <SmallButton>{sessionData ? t.logOut : t.logIn}</SmallButton>
              </div>
            </Reveal>
            <div
              className="flex items-center text-2xl lg:hidden"
              onClick={toggleMenu}
            >
              {!isMenuActive ? <BiMenuAltRight /> : <BiX />}
            </div>
          </div>
        </div>
        {isMenuActive && <MobileNav links={links} activePath={activePath} />}
      </div>
    </nav>
  );
};

const MobileNav = ({ links, activePath }: Props) => {
  const { data: sessionData } = useSession();

  const router = useRouter()

  const t = router.locale === "en" ? en : kn

  return (
    <div className="">
      {/* <div className="">{`${sessionData}`}</div> */}
      <div className="flex flex-col items-end space-y-3 pt-0 pb-3 lg:hidden">
        {links.map((link, idx) => {
          return (
            <Reveal key={idx} classes="">
              <Link
                className="flex items-center"
                key={link.label}
                href={link.url}
              >
                <div
                  className={
                    activePath?.label === link.label ? "text-secondary-100" : ""
                  }
                >
                  {link.label}
                </div>
              </Link>
            </Reveal>
          );
        })}
        <Reveal classes="">
          <LanguageDropdown t={{lang: t.lang, kan: t.kan, eng: t.eng}}></LanguageDropdown>
        </Reveal>
          <Reveal classes="">
            <div className="" onClick={sessionData ? () => void signOut() : () => void signIn("auth0")}>
              <SmallButton>{sessionData ? t.logOut : t.logIn}</SmallButton>
            </div>
          </Reveal>
      </div>
    </div>
  );
};

export default Navbar;
