import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiLogoInstagram, BiLogoGmail } from 'react-icons/bi'

const Footer = () => {
  const links = [
    { label: "Home", url: "/" },
    { label: "Sponsors", url: "/sponsors" },
    { label: "Achievements", url: "/achievements" },
    { label: "About Us", url: "/about" },
  ];

  const contacts = [
    { label: <BiLogoInstagram />, url: "https://www.instagram.com/kalaa_sangama/" },
    { label: <BiLogoGmail fill="none" strokeWidth={1.5} />, url: "mailto:kalaasangama.nmamit@nitte.edu.in" },
  ]

  const router = useRouter();

  // Need to find the active page...
  const activePaths = links.filter((link) => link.url === router.pathname);
  // Idk to implement, thus doing in alternate hack... Typescript throwing error if directly used links.find()
  const activePath = activePaths[0] ? activePaths[0] : { label: "", url: "" };

  return (
    <div className="border-t-[1px] border-gray-600 bg-gradient-to-br from-primary-100 to-gray-950">
      <div className="relative flex flex-col items-center justify-center overflow-hidden text-base xl:text-lg gap-10 p-10 max-w-7xl xl:mx-auto">
        <div className="flex flex-col md:flex-row w-full justify-around items-center gap-5 md:gap-20">
          <div className="relative">
            <Link href={'/'}>
              <Image src={'https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/kalaasangamalogo.png'} alt="Logo" className="object-contain object-center w-20 md:w-24 lg:w-28 2xl:w-30" height={90} width={90} priority />

            </Link>
          </div>
          <div className="flex flex-col justify-start gap-1 md:gap-2">
            <div className="flex md:flex-row justify-center items-center gap-1 md:gap-5 whitespace-nowrap select-none text-sm sm:text-base">
              {links.map((link, idx) => {
                return (
                  <>
                    <Link key={`footer${idx}`} className={ "py-2" +
                      activePath?.label === link.label
                        ? "text-secondary-100"
                        : "transition duration-150 ease-linear hover:text-secondary-200"
                      } href={link.url}>
                        {link.label}
                    </Link>
                    {idx !== links.length-1 && <span className="mx-3 py-2" key={`footer_${idx}`}>|</span>}  
                  </>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col justify-start items-center gap-1 md:gap-2 w-24 md:w-32 lg:w-36 2xl:w-44">
            <ul className="flex flex-row justify-center text-lg sm:text-xl md:text-2xl xl:text-3xl gap-4 md:gap-5">
              {contacts.map((contact, idx) => {
                return (                
                    <a key={idx} href={contact.url} target="_blank" className="text-white hover:text-secondary-200 transition duration-150 ease-linear">{contact.label}</a>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="text-base xl:text-lg text-center flex flex-col gap-2">
          <Link href={"/team"} className="transition-all hover:tracking-widest text-gray-300 underline-offset-4">Made with ❤️ by <span className="text-secondary-100 font-medium">Finite Loop Club</span></Link>
          <div className="">
            © <span className="text-secondary-100 font-medium">Kalaasangama</span> 2023
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
