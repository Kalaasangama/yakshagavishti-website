import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { SmallButton } from "../Button";
import Reveal from "../Animations/reveal";
import { signIn, signOut, useSession } from "next-auth/react";

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

  // Need to find the active page...
  const activePaths = links.filter((link) => link.url === router.pathname);
  // Idk to implement, thus doing in alternate hack... Typescript throwing error if directly used links.find()
  const activePath = activePaths[0] ? activePaths[0] : { label: "", url: "" };

  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <nav className="fixed top-2 z-50 font-rhomdon tracking-widest font-medium w-full max-w-screen-2xl left-1/2 -translate-x-1/2">
      <div className="flex flex-col backdrop-blur-md border-b border-orange-300 rounded-3xl  px-5 text-white text-sm sm:text-sm md:text-base xl:text-lg mx-3 sm:mx-7 lg:mx-28 py-2 sm:py-4">
        <div className="flex justify-between items-center">
          <Reveal classes="">
            <div  className="flex items-center justify-start">
              <Link href={'/'}>
                <Image
                  src={"https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/logo.png"}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="object-contain object-left relative w-[4.5rem] md:w-20 lg:w-[5.25rem]"
                />
              </Link>
            </div>
          </Reveal>
          <div className="hidden space-x-7 lg:flex">
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
                      {link.label}
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <div className="flex gap-5 items-center">
            <Reveal classes="hidden lg:block">
              <div className="" onClick={sessionData ? () => void signOut() : () => void signIn("google")}>
                <SmallButton>{sessionData ? "Log Out" : "Log In"}</SmallButton>
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
        <div className="flex gap-4 items-center">
          <Reveal classes="">
            <div onClick={sessionData ? () => void signOut() : () => void signIn("auth0")}>
              <SmallButton>{sessionData ? "Log Out" : "Log In"}</SmallButton>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
