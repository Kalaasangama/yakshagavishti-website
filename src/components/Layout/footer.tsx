import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiLogoInstagramAlt, BiLogoGmail } from 'react-icons/bi'
import { Contact } from "lucide-react";

const Footer = () => {
  const links = [
    { label: "Home", url: "/" },
    { label: "Sponsors", url: "/sponsors" },
    { label: "Achievements", url: "/achievements" },
    { label: "About Us", url: "/about" },
  ];

  const contacts = [
    { label: <BiLogoInstagramAlt />, url: "/" },
    { label: <BiLogoGmail />, url: "/" },
  ]

  const router = useRouter();

  // Need to find the active page...
  const activePaths = links.filter((link) => link.url === router.pathname);
  // Idk to implement, thus doing in alternate hack... Typescript throwing error if directly used links.find()
  const activePath = activePaths[0] ? activePaths[0] : { label: "", url: "" };

  return (
    <div className="relative flex flex-col md:flex-row justify-center overflow-hidden text-[0.5rem] sm:text-sx md:text-sx xl:text-sm gap-10 md:gap-20 border-t-[1px] border-gray-500 p-10">
      <div className="flex flex-row justify-center gap-10 md:gap-20">

        <div className="flex flex-col justify-start gap-1 md:gap-2">
          <div className="text-xs sm:text-sm md:text-base xl:text-lg mb-1 md:mb-2 text-center">Quick Links</div>
          <div className="flex flex-col md:flex-row gap-1 md:gap-5">
            {links.map((link, idx) => {
              return (
                <Link key={idx} className={
                  activePath?.label === link.label
                    ? "text-secondary-100"
                    : "transition duration-150 ease-linear hover:text-secondary-200"
                } href={link.url}>
                  <div
                    className=""
                  >
                    {link.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col justify-start gap-1 md:gap-2">
          <div className="text-xs sm:text-sm md:text-base xl:text-lg mb-1 md:mb-2">Follow On</div>
          <ul className="flex flex-row justify-center text-sm sm:text-base md:text-lg xl:text-xl gap-2 md:gap-5">
            {contacts.map((contact, idx) => {
              return (                
                  <Link key={idx} href={contact.url} className="text-white hover:text-secondary-200 transition duration-150 ease-linear">{contact.label}</Link>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="text-xs sm:text-sm md:text-base xl:text-lg self-center">
        © <span className="text-secondary-100 font-medium">Kalasangama</span> 2023
      </div>
        
      <div className="absolute left-[50%] top-full -z-10 h-60 w-60 -translate-y-[50%] opacity-50">
        <Image
          src={"/mandala.png"}
          height={500}
          width={500}
          alt=""
          className="opacity-70 bg-blend-luminosity"
        />
      </div>
    </div>
  );
};

export default Footer;
