import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { Button } from "../ui/button";
import Reveal from "../Animations/reveal";

type Link = {
  label: string;
  url: string;
};

type Props = {
  links: Link[];
  activePath: Link;
};

const Navbar = () => {
  const links = [
    { label: "Home", url: "/" },
    { label: "Sponsors", url: "/sponsors" },
    { label: "Achievements", url: "/achievements" },
    { label: "About Us", url: "/about" },
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

  const closeMenu = () => {
    if (isMenuActive) setTimeout(() => {setIsMenuActive(!isMenuActive)}, 100)
  }

  useEffect(() => {
    document.addEventListener('touchstart', closeMenu);
    return () => {
      document.removeEventListener('touchstart', closeMenu);
    };
  });

  return (
    <nav className="sticky top-2 z-50 font-medium overflow-hidden">
      <div className="flex flex-col backdrop-blur-md border-[1px] border-orange-300 rounded-3xl px-5 text-white text-xs sm:text-sm md:text-base xl:text-lg mx-3 sm:mx-7 lg:mx-28 py-2 sm:py-4 2xl:py-6">
        <div className="flex justify-between items-center">
          <Reveal classes="">
            <div  className="flex items-center justify-center w-[5rem] h-[1rem] md:w-[8rem] md:h-[5rem]">
              <Image
                src={"/logo-copy.png"}
                alt="Logo"
                width={200}
                height={200}
                className="object-contain object-center relative"
              />
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
                      {link.label}
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <div className="flex gap-5">
            <Reveal classes="hidden lg:block">
              <Button>Log In</Button>
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
  return (
    <div className="">
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
          <Button>Log In</Button>
        </Reveal>
      </div>
    </div>
  );
};

export default Navbar;
