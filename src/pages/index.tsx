import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic.js";
const Timer = dynamic(() => import("~/components/Home/timer"), { ssr: false });
import Faq from "~/components/Home/faq";
import Reveal from "~/components/Animations/reveal";
import { Button, OutlineButton } from "~/components/Button";
import { BiDownload } from "react-icons/bi";
import Reel from "~/components/Home/reel";
import { useState, useRef, useEffect } from "react";
import ScrollLag from "~/components/Animations/scrollLag";
import { useContainerDimension } from "~/components/customHooks";
import CollegeReg from "~/components/Forms/CollegeReg";
import LeadRegister from "~/components/Forms/LeadRegister";
import MemberReg from "~/components/Forms/MemberReg";
import CreateTeam from "~/components/Forms/MainForm";
import { motion, useScroll, useTransform } from "framer-motion"


// import ViewDialog from "~/components/ViewDialog";
import ViewTeam from "~/components/ViewTeam";
const reelImags = [
  { src: "/Cloudinary/home/reel/1.jpg" },
  { src: "/Cloudinary/home/reel/2.jpg" },
  { src: "/Cloudinary/home/reel/3.jpg" },
  { src: "/Cloudinary/home/reel/4.jpg" },
  { src: "/Cloudinary/home/reel/5.jpg" },
  { src: "/Cloudinary/home/reel/6.jpg" },
  { src: "/Cloudinary/home/reel/7.jpg" },
  { src: "/Cloudinary/home/reel/8.jpg" },
]


export default function Home() {
  const ref = useRef(null)
    const {scrollYProgress} = useScroll({
      target: ref,
      offset: ["start end", "end start"]
    })
    const yPos = useTransform(scrollYProgress, [0, 1], ["-90%", "-15%"])
  const mainRef = useRef<HTMLDivElement>(null)
	const [isRegistrationActive, setIsRegistrationActive] = useState<boolean>(true);
	const { data: sessionData } = useSession();
	const handleDownload = (path: string, name: string) => {
		// fallback to window.open if the browser doesn't support the download attribute
		const fileUrl = path;
		const fileName = name;

		const link = document.createElement("a");
		link.href = fileUrl;
		link.download = fileName;

		document.body.appendChild(link);
		link.click();

    document.body.removeChild(link);
  };
  
  return (
    <>
      <div ref={mainRef} className="flex flex-col gap-10 md:gap-20 mb-20">

        {/* Hero Section */}

        <section  className="relative flex flex-col justify-end items-center h-screen w-full bg-image-gradient mt-1">
          <Image src={'/Cloudinary/home/Gavishti background.png'} alt="Banner" className=" select-none object-cover opacity-75 object-center -z-30 hidden sm:block" fill />
          <div className="mx-4 sm:mx-8 lg:mx-32 landscape:short:gap-8 flex flex-col items-center gap-14 max-w-7xl">

            <motion.img style={{y: yPos, x: "-50%"}} ref={ref} src={'/Cloudinary/home/title2.png'} height={800} width={800} className="w-full max-w-xl absolute h-auto object-contaiin top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_10px_#fff] pointer-events-none" alt="Background" />

          <Image src={'/Cloudinary/home/Gavishti mobile background.png'} alt="Background Image" className="h-full w-full absolute inset-0 -z-30 object-center object-cover sm:hidden" fill />
          
          <div className="absolute bottom-0 left-0 right-0 h-screen w-full sm:hidden overflow-hidden -z-10">
            <Image src={'/Cloudinary/home/Layer 6.png'} height={300} width={300} alt="" className="select-none w-full object-contain object-bottom absolute bottom-0 left-0 right-0" />
          </div>

            {/* Contents - Hero Section */}

            <Reveal classes="">
              <div className="flex flex-col items-center gap-1 landscape:short:gap-1 text-center">
                {/* <div className="font-rhomdon font-bold text-5xl sm:text-7xl md:text-8xl 2xl:text-9xl landscape:short:text-7xl leading-snug sm:leading-snug md:leading-normal 2xl:leading-relaxed">Yakshagavishti</div> */}
              </div>

            </Reveal>
              <Reveal classes="flex justify-center">
                <ScrollLag classes="w-fit mb-48 xl:mb-32 landscape:short:mb-3" speed={75}>
                  {isRegistrationActive && !sessionData ? <div className="" onClick={sessionData ? () => void signOut() : () => void signIn("google")}><Button>Register</Button></div> : (!sessionData?.user?.team?.isComplete ? <CreateTeam/>:<ViewTeam/>)}
                </ScrollLag>
              </Reveal>
              
          </div>
        </section>

        <div style={{height: `calc(${useContainerDimension(mainRef).height + 200}px - 100vh)`}} className="bg-gradient-to-t from-primary-100/80 via-transparent to-primary-100 absolute top-full w-full -z-[5]"></div>

          <section className="relative h-[60vh] sm:h-screen flex items-start mx-4 sm:mx-8 lg:mx-32 justify-center overflow-hidden">
            <div className="max-w-7xl xl:mx-auto">
              <Reveal classes="2xl:hidden">
                <ScrollLag classes="" speed={300}>
                  <div className="h-full mt-[10vh] sm:mt-[25vh] md:mt-[30vh]">
                    <Timer setIsRegistrationActive={setIsRegistrationActive} />
                  </div>
                </ScrollLag>
              </Reveal>
              <Reveal classes="hidden 2xl:block">
                <ScrollLag classes="" speed={200}>
                  <div className="h-full mt-[30vh]">
                    <Timer setIsRegistrationActive={setIsRegistrationActive} />
                  </div>
                </ScrollLag>
              </Reveal>
            </div>

            <Image
                className="-z-10 object-contain opacity-50 mix-blend-luminosity py-16 sm:py-20 md:py-24 transition-all ease-rotationTick animate-rotation"
                src={"/Cloudinary/home/mandala-center.png"}
                fill
                alt="mandala"
            ></Image>
						{/* <ScrollLag
							speed={100}
							classes="absolute -z-10 h-48 w-48 lg:h-60 lg:w-60 -top-40 -translate-y-[50%] right-0 md:right-[10%] -translate-x-[50%] opacity-50"
						>
							<Image
								src={"/Cloudinary/home/mandala.png"}
								fill
								alt=""
								className="select-none opacity-70  bg-blend-luminosity"
							/>
						</ScrollLag> */}
					</section>

					{/* About the Competition */}

            <section className="relative flex min-h-max w-full items-center justify-center md:pb-10 max-w-7xl xl:mx-auto">
              

              {/* Competition Contents section */}

              <div  className="mx-4 sm:mx-8 lg:mx-32 flex flex-col h-full items-center gap-5 sm:gap-16 " id="about" >
                <div className="flex flex-col md:flex-row items-center md:gap-10 gap-0">
                  <div className="flex flex-col gap-3">
                    <Reveal classes="">
                      <div className="font-rhomdon text-3xl sm:text-4xl md:text-5xl 2xl:text-5xl text-center md:text-left">
                        About <span className="text-secondary-100">Yakshagavishti</span>
                      </div>
                    </Reveal>
                    <Reveal classes="">
                      <div className="text-base md:text-lg xl:text-xl text-center md:text-justify">
                        <p>Immerse yourself in the fusion of tradition and innovation as our dedicated team invites select participants to be part of this unique Yakshagana competition. This one-of-a-kind competition seamlessly integrates centuries-old storytelling with a modern approach, all while preserving the essence of this beloved folk art. Join us on this transformative journey where ancient narratives and the rich heritage of Yakshagana meets a contemporary context of technology for better experience and transparency.</p>
                      </div>
                    </Reveal>
                  </div>
                  <div className="shrink-0 flex flex-col gap-3 items-center">
                    <Reveal classes="">
                      <div className="group h-48 w-48 sm:h-56 sm:w-56 lg:h-60 lg:w-60 relative shrink-0 overflow-hidden border-secondary-100 drop-shadow-[0px_0px_12px_#df8b2b] hover:scale-105 transition duration-200 ease-linear rounded-xl">
                        <Image src={'/Cloudinary/home/logo.png'} alt="Yakshagana" fill className=" select-none object-contain object-center rounded-xl hover:grayscale-0  transition duration-300 ease-linear" />
                        {/* <div className="h-[200%] w-[200%] rotate-45 -translate-x-full -translate-y-full group-hover:-translate-x-[25%] group-hover:-translate-y-[25%] transition duration-300 ease-linear bg-secondary-transparent-0.5 relative z-10"></div> */}
                      </div>
                    </Reveal>
                    <div  className="flex md:flex-col gap-3 items-center scroll-mt-[4.75rem] sm:scroll-mt-[5.75rem] md:scroll-mt-24 lg:scroll-mt-[6.25rem]">
                      <Reveal classes="">
                        <a onClick={() => handleDownload("/Rules.pdf", "Rules.pdf")} className="w-fit">
                          <OutlineButton>
                            <div className="flex gap-2 items-center justify-center">
                              <BiDownload />
                              <span>Rule Book</span>
                            </div>
                          </OutlineButton>
                        </a>
                      </Reveal>
                      <Reveal classes="">
                        <a onClick={() => handleDownload("/ಭೀಷ್ಮ ಪ್ರತಿಜ್ಞೆ.pdf", "ಭೀಷ್ಮ ಪ್ರತಿಜ್ಞೆ.pdf")} className="w-fit">
                          <OutlineButton>
                            <div className="flex gap-2 items-center justify-center">
                              <BiDownload />
                              <span>Prasanga Padya</span>
                            </div>
                          </OutlineButton>
                        </a>
                      </Reveal>
                    </div>
                  </div>
                </div>

              </div>
            </section>


					{/* Achievements Reel Section */}
          <div className="min-w-full max-w-7xl xl:mx-auto min-h-[50vh] sm:min-h-[70vh] lg:min-h-screen items-center flex overflow-hidden">
            <div className="w-full xl:mx-auto flex justify-center mb-20 sm:mb-24 md:mb-64 lg:mb-72 2xl:hidden">
              <Reel classes="blur-sm opacity-[0.47] md:opacity-100" baseVelocity={0.5} angle={12} reelImg={reelImags} />
              <Reel classes="" baseVelocity={-0.75} angle={-12} reelImg={reelImags} />
            </div>
            <div className="w-full xl:mx-auto hidden justify-center 2xl:flex">
              <Reel classes="" baseVelocity={-1.5} angle={0} reelImg={reelImags} />
            </div>
          </div>

					{/* FAQ */}

          <section className="mx-4 sm:mx-8 lg:mx-32 flex flex-col gap-3 relative sm:mt-48 md:mt-12 xl:mt-20 2xl:mt-0 ">
            <ScrollLag speed={125} classes="absolute -z-10 h-48 w-48 lg:h-60 lg:w-60 bottom-[300%] right-full hidden lg:block -translate-y-full opacity-50">
              <div className="">
                <Image src={'/Cloudinary/home/mandala.png'} fill alt='' className="object-contain select-none  opacity-70 bg-blend-luminosity" />
              </div>
            </ScrollLag>
            <div className="max-w-7xl xl:-translate-x-1/2 relative xl:left-1/2">
              <Faq />
            </div>
          </section>

      </div>
    </>
  );
}
