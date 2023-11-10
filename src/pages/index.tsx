import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic.js";
const Timer = dynamic(() => import("~/components/Home/timer"), { ssr: false });
import Faq from "~/components/Home/faq";
import Reveal from "~/components/Animations/reveal";
import { Button, InactiveButton, OutlineButton } from "~/components/Button";
import { BiDownload } from "react-icons/bi";
import Reel from "~/components/Home/reel";
import { CreateTeamDialog } from "~/components/Forms/CreateTeam";
import { useState } from "react";
import ScrollLag from "~/components/Animations/scrollLag";
import { useRouter } from "next/router";
import kn from "~/locale/kn";
import en from "~/locale/en";
import CollegeReg from "~/components/Forms/CollegeReg";
import LeadRegister from "~/components/Forms/LeadRegister";
import MemberReg from "~/components/Forms/MemberReg";
import ViewDialog from "~/components/ViewDialog";
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
	const [isRegistrationActive, setIsRegistrationActive] =
		useState<boolean>(true);
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

  const router = useRouter()
  const t = router.locale === "en" ? en : kn

  return (
    <>
      <Head>
        <title>Yakshagavishti</title>
        <meta name="description" content="Yakshagavishti" />
        <link rel="icon" href="/logo.png" type="images/png" sizes="64x64"/>
      </Head>
      <main className="flex flex-col">
        {/* <AuthShowcase /> */}

        {/* Hero Section */}

        <section  className="relative flex flex-col justify-center items-center h-screen w-full bg-gradient-to-b from-primary-100 via-primary-transparent-50  to-primary-100 mt-1">
          <Image src={'/Banner-cropped.jpg'} alt="Banner" className=" select-none object-cover opacity-75 object-center -z-10 drop-shadow-[0_0_30px_theme(colors.primary-100)]" fill />
          <div className="mx-4 sm:mx-8 lg:mx-32 landscape:short:gap-8 flex flex-col items-center gap-14 max-w-7xl">

            {/* Contents - Hero Section */}

            <Reveal classes="">
              <div className="flex flex-col items-center gap-1 landscape:short:gap-1 text-center">
                <div className="font-hindi font-bold text-5xl sm:text-7xl md:text-8xl 2xl:text-9xl landscape:short:text-7xl leading-snug sm:leading-snug md:leading-normal 2xl:leading-relaxed drop-shadow-[0_0_10px_theme(colors.secondary-200)]">Yakshagavishti</div>
              </div>

            </Reveal>
            <Reveal classes="flex justify-center">
              <div className="w-fit">
                {isRegistrationActive && !sessionData ? <div className="" onClick={sessionData ? () => void signOut() : () => void signIn("auth0")}><Button>Register</Button></div> : (!sessionData.user.team?<ViewDialog />:<MemberReg />)}
              </div>
            </Reveal>
          </div>
        </section>

        <div className="flex flex-col gap-10 md:gap-20 py-20 bg-gradient-to-t from-primary-100/80 via-transparent  to-primary-100  overflow-hidden justify-center">

          <section className="relative h-48 py-16 sm:mb-16 md:mb-0 max-h-40 flex items-start mx-4 sm:mx-8 lg:mx-32 justify-center">
            <div className="max-w-7xl xl:mx-auto">
              <Reveal classes="2xl:hidden">
                <ScrollLag classes="" speed={500}>
                  <div className="h-full -m-4 md:-m-16">
                    {isRegistrationActive && <Timer setIsRegistrationActive={setIsRegistrationActive} />}
                  </div>
                </ScrollLag>
              </Reveal>
              <Reveal classes="hidden 2xl:block">
                <ScrollLag classes="" speed={200}>
                  <div className="h-full 2xl:-m-8">
                    {isRegistrationActive && <Timer setIsRegistrationActive={setIsRegistrationActive} />}
                  </div>
                </ScrollLag>
              </Reveal>
            </div>

						<ScrollLag
							speed={100}
							classes="absolute -z-10 h-48 w-48 lg:h-60 lg:w-60 -top-40 -translate-y-[50%] right-0 md:right-[10%] -translate-x-[50%] opacity-50"
						>
							<Image
								src={"/Cloudinary/home/mandala.png"}
								fill
								alt=""
								className="select-none opacity-70  bg-blend-luminosity"
							/>
						</ScrollLag>
					</section>

					{/* About the Competition */}

            <section className="relative flex mt-32 min-h-max w-full items-center justify-center md:pb-10 max-w-7xl xl:mx-auto">
              <Image
                className="-z-10 object-contain py-16 opacity-25 mix-blend-luminosity sm:py-28 md:py-0"
                src={"/Cloudinary/home/mandala-center.png"}
                fill
                alt="mandala"
              ></Image>

              {/* Competition Contents section */}

              <div  className="mx-4 sm:mx-8 lg:mx-32 flex flex-col h-full items-center gap-5 sm:gap-16 " id="about" >
                <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="flex flex-col gap-3">
                    <Reveal classes="">
                      <div className="font-hindi text-xl sm:text-4xl md:text-4xl 2xl:text-5xl text-center md:text-left">
                        About <span className="text-secondary-100">Yakshagavishti</span>
                      </div>
                    </Reveal>
                    <Reveal classes="">
                      <div className="text-xs sm:text-sm md:text-base xl:text-lg text-center md:text-justify">
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
                        <a onClick={() => handleDownload("/Cloudinary/home/Rules.pdf", "Rules.pdf")} className="w-fit">
                          <OutlineButton>
                            <div className="flex gap-2 items-center justify-center">
                              <BiDownload />
                              <span>Rule Book</span>
                            </div>
                          </OutlineButton>
                        </a>
                      </Reveal>
                      <Reveal classes="">
                        <a onClick={() => handleDownload("/Cloudinary/home/ಭೀಷ್ಮ ಪ್ರತಿಜ್ಞೆ.pdf", "ಭೀಷ್ಮ ಪ್ರತಿಜ್ಞೆ.pdf")} className="w-fit">
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

                {/* Rules and regulation section */}

                {/* <div className="flex flex-col gap-3 max-w-2xl">
                  <Reveal classes="">
                    <p className="font-hindi text-xl sm:text-4xl md:text-4xl 2xl:text-5xl text-center md:text-left">
                      Rules & <span className="text-secondary-100">regulations</span>
                    </p>
                  </Reveal>
                  <ul className="text-xs sm:text-sm md:text-base xl:text-lg">
                    <Reveal classes="">
                      <li className="flex items-center gap-3"><GiPaperArrow className="-rotate-45 text-secondary-100 select-none" /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, nisi!</li>
                    </Reveal>
                    <Reveal classes="">
                      <li className="flex items-center gap-3"><GiPaperArrow className="-rotate-45 text-secondary-100 select-none" /> LExplicabo ullam quasi similique deserunt ad voluptas consectetur dolorem</li>
                    </Reveal>
                    <Reveal classes="">
                      <li className="flex items-center gap-3"><GiPaperArrow className="-rotate-45 text-secondary-100 select-none" /> Obcaecati consequatur blanditiis unde voluptate eligendi ipsam oprepr enderit</li>
                    </Reveal>
                    <Reveal classes="">
                      <li className="flex items-center gap-3"><GiPaperArrow className="-rotate-45 text-secondary-100 select-none" /> Obcaecati consequatur blanditiis unde voluptate eligendi ipsam optio reprehenderit</li>
                    </Reveal>
                    <Reveal classes="">
                      <li className="flex items-center gap-3"><GiPaperArrow className="-rotate-45 text-secondary-100 select-none" /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, nisi!</li>
                    </Reveal>
                    <Reveal classes="">
                      <li className="flex items-center gap-3"><GiPaperArrow className="-rotate-45 text-secondary-100 select-none" /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, nisi!</li>
                    </Reveal>
                    <Reveal classes="">
                      <li className="flex items-center gap-3"><GiPaperArrow className="-rotate-45 text-secondary-100 select-none" /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, nisi!</li>
                    </Reveal>
                  </ul>
                </div> */}
              </div>
            </section>


					{/* Achievements Reel Section */}

          <section className="min-w-full max-w-7xl xl:mx-auto min-h-[50vh] items-center flex">
            <div className="w-full xl:mx-auto flex justify-center mb-20 sm:mb-24 md:mb-64 lg:mb-72 2xl:hidden">
              <Reel classes="blur-sm opacity-[0.47] md:opacity-100" baseVelocity={0.5} angle={12} reelImg={reelImags} />
              <Reel classes="" baseVelocity={-0.75} angle={-12} reelImg={reelImags} />
            </div>
            <div className="w-full xl:mx-auto hidden justify-center 2xl:flex">
              <Reel classes="" baseVelocity={-1.5} angle={0} reelImg={reelImags} />
            </div>
          </section>

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

      </main>
    </>
  );
}

function AuthShowcase() {
	const { data: sessionData } = useSession();
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<p className="text-center text-2xl ">
				{sessionData && (
					<span>Logged in as {sessionData.user?.name}</span>
				)}
			</p>

			<button
				className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
				onClick={
					sessionData ? () => void signOut() : () => void signIn()
				}
			>
				{sessionData ? "Sign out" : "Sign in"}
			</button>
		</div>
	);
}
