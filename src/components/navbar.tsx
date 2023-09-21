import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { BiMenuAltRight, BiX } from "react-icons/bi";

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
    { label: "Register", url: "/register" },
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

  return (
    <nav className="relative z-50 bg-transparent">
      <div className="mx-4 flex flex-col border-b-[1px] py-4 text-white sm:mx-8 lg:mx-32">
        <div className="flex justify-between">
          <div className="flex items-center justify-center">
            <Image
              src={"/"}
              alt="Logo"
              width={50}
              height={50}
              className="object-contain object-center"
            />
          </div>
          <div className="hidden space-x-7 lg:flex">
            {links.map((link) => {
              return (
                <Link
                  className="flex items-center"
                  key={link.label}
                  href={link.url}
                >
                  <div
                    className={
                      activePath?.label === link.label
                        ? "text-secondary-100"
                        : ""
                    }
                  >
                    {link.label}
                  </div>
                </Link>
              );
            })}
          </div>
          <div
            className="flex items-center text-2xl lg:hidden"
            onClick={toggleMenu}
          >
            {!isMenuActive ? <BiMenuAltRight /> : <BiX />}
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
      <div className="flex flex-col space-y-3 py-3 md:hidden">
        {links.map((link) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
