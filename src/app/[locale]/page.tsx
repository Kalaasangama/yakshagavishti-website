"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import dynamic from "next/dynamic";
const Timer = dynamic(() => import("~/components/Home/timer"), { ssr: false });
import Faq from "~/components/Home/faq";
import Reveal from "~/components/Animations/reveal";
import { Button, OutlineButton } from "~/components/Button";
import { BiDownload } from "react-icons/bi";
import Reel from "~/components/Home/reel";
import { useState, useRef } from "react";
import ScrollLag from "~/components/Animations/scrollLag";
import { useContainerDimension } from "~/components/customHooks";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import CreateTeam from "~/components/Forms/MainForm";
import ViewTeam from "~/components/ViewTeam";
import { Role } from "@prisma/client";

const reelImags = [
  {
    src: "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/reel/1.jpg",
  },
  {
    src: "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/reel/2.jpg",
  },
  {
    src: "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/reel/3.jpg",
  },
  {
    src: "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/reel/4.jpg",
  },
  {
    src: "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/reel/5.jpg",
  },
  {
    src: "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/reel/6.jpg",
  },
  {
    src: "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/reel/7.jpg",
  },
  {
    src: "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/reel/8.jpg",
  },
];

export default function Home() {
  const ref = useRef(null);
  const t = useTranslations("Home");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yPos = useTransform(scrollYProgress, [0, 1], ["-90%", "-15%"]);
  const mainRef = useRef<HTMLDivElement>(null);
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

  return (
    <>
      <div ref={mainRef} className="flex flex-col gap-10 pb-20 md:gap-20">
        {/* Hero Section */}

        <section className="bg-image-gradient relative mt-1 flex h-screen w-full flex-col items-center justify-end overflow-y-hidden">
          <Image
            src={
              "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/Gavishti_background.png"
            }
            alt="Banner"
            className="-z-30 hidden select-none object-cover object-center opacity-75 sm:block"
            fill
            priority
          />
          <div className="mx-4 flex max-w-7xl flex-col items-center gap-14 sm:mx-8 lg:mx-32 landscape:short:gap-8">
            <motion.div
              style={{ y: yPos, x: "-50%" }}
              ref={ref}
              className="pointer-events-none absolute left-1/2 top-[72%] h-[800px] w-full max-w-xl -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_10px_#fff]"
            >
              <div className="relative h-full w-full">
                <Image
                  src="/background.png"
                  alt="Background Image"
                  className="object-contain"
                  fill
                  priority
                />

                <div className="opacity-85 absolute inset-0 top-1/4 flex scale-x-125 flex-col items-center justify-center font-rhomdon text-[22px] font-extralight text-[#873838]">
                  <p>
                    April 12<sup>th</sup>
                  </p>
                  <p>Ranga Mantapa</p>
                </div>
              </div>
            </motion.div>
            <Image
              src={
                "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/Gavishti_mobile_background.png"
              }
              alt="Background Image"
              className="absolute inset-0 -z-30 h-full w-full object-cover object-center sm:hidden"
              fill
              priority
            />

            <div className="absolute bottom-24 left-0 right-0 -z-10 h-screen w-full overflow-hidden sm:hidden short:bottom-0">
              <Image
                src={
                  "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/Layer_6.png"
                }
                height={300}
                width={300}
                alt=""
                className="absolute bottom-0 left-0 right-0 w-full select-none object-contain object-center"
                priority
              />
            </div>

            {/* Contents - Hero Section */}

            <Reveal classes="bottom-24">
              <div className="flex flex-col items-center gap-1 text-center landscape:short:gap-1">
                {/* <div className="font-rhomdon font-bold text-5xl sm:text-7xl md:text-8xl 2xl:text-9xl landscape:short:text-7xl leading-snug sm:leading-snug md:leading-normal 2xl:leading-relaxed">Yakshagavishti</div> */}
                {isRegistrationActive && !sessionData ? (
                  <div
                    className=""
                    onClick={
                      sessionData
                        ? () => void signOut()
                        : () => void signIn("google")
                    }
                  >
                    <Button>Register</Button>
                  </div>
                ) : (
                  sessionData?.user.role === Role.PARTICIPANT &&
                  (!sessionData?.user?.LeaderOf?.isComplete ? (
                    <CreateTeam />
                  ) : (
                    <ViewTeam />
                  ))
                )}
              </div>
            </Reveal>
          </div>
        </section>

        <div
          style={{
            height: `calc(${
              useContainerDimension(mainRef)?.height ?? 0 + 200
            }px - 100vh)`,
          }}
          className="absolute top-full -z-[5] w-full bg-gradient-to-t from-primary-100/80 via-transparent to-primary-100"
        ></div>

        <section className="relative mx-4 flex h-[60vh] items-start justify-center overflow-hidden sm:mx-8 sm:h-screen lg:mx-32">
          <div className="max-w-7xl xl:mx-auto">
            <Reveal classes="2xl:hidden">
              <ScrollLag classes="" speed={300}>
                <div className="mt-[10vh] h-full sm:mt-[25vh] md:mt-[30vh]">
                  <Timer setIsRegistrationActive={setIsRegistrationActive} />
                </div>
              </ScrollLag>
            </Reveal>
            <Reveal classes="hidden 2xl:block">
              <ScrollLag classes="" speed={200}>
                <div className="mt-[30vh] h-full">
                  <Timer setIsRegistrationActive={setIsRegistrationActive} />
                </div>
              </ScrollLag>
            </Reveal>
          </div>

          <Image
            className="-z-10 animate-rotation object-contain py-16 opacity-50 mix-blend-luminosity transition-all ease-rotationTick sm:py-20 md:py-24"
            src={
              "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/mandala-center.png"
            }
            fill
            alt="mandala"
          ></Image>
          {/* <ScrollLag
							speed={100}
							classes="absolute -z-10 h-48 w-48 lg:h-60 lg:w-60 -top-40 -translate-y-[50%] right-0 md:right-[10%] -translate-x-[50%] opacity-50"
						>
							<Image
								src={"https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/mandala.png"}
								fill
								alt=""
								className="select-none opacity-70  bg-blend-luminosity"
							/>
						</ScrollLag> */}
        </section>

        {/* About the Competition */}

        <section className="relative flex min-h-max w-full max-w-7xl items-center justify-center md:pb-10 xl:mx-auto">
          {/* Competition Contents section */}

          <div
            className="mx-4 flex h-full flex-col items-center gap-5 sm:mx-8 sm:gap-16 lg:mx-32"
            id="about"
          >
            <div className="flex flex-col items-center gap-0 md:flex-row md:gap-10">
              <div className="flex flex-col gap-3">
                <Reveal classes="">
                  <div className="text-center font-rhomdon text-3xl sm:text-4xl md:text-left md:text-5xl 2xl:text-5xl">
                    {t("About").split(" ")[0]}{" "}
                    <span className="text-secondary-100">
                      {t("About").split(" ")[1]}
                    </span>
                  </div>
                </Reveal>
                <Reveal classes="">
                  <div className="text-center text-base md:text-justify md:text-lg xl:text-xl">
                    <p>{t("AboutContent")}</p>
                  </div>
                </Reveal>
              </div>
              <div className="flex shrink-0 flex-col items-center gap-3">
                <Reveal classes="">
                  <div className="group relative h-48 w-48 shrink-0 overflow-hidden rounded-xl border-secondary-100 drop-shadow-[0px_0px_12px_#df8b2b] transition duration-200 ease-linear hover:scale-105 sm:h-56 sm:w-56 lg:h-60 lg:w-60">
                    <Image
                      src={
                        "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/logo.png"
                      }
                      alt="Yakshagana"
                      fill
                      className="select-none rounded-xl object-contain object-center transition duration-300 ease-linear hover:grayscale-0"
                    />
                    {/* <div className="h-[200%] w-[200%] rotate-45 -translate-x-full -translate-y-full group-hover:-translate-x-[25%] group-hover:-translate-y-[25%] transition duration-300 ease-linear bg-secondary-transparent-0.5 relative z-10"></div> */}
                  </div>
                </Reveal>
                <div className="flex scroll-mt-[4.75rem] items-center gap-3 sm:scroll-mt-[5.75rem] md:scroll-mt-24 md:flex-col lg:scroll-mt-[6.25rem]">
                  <Reveal classes="">
                    <a
                      onClick={() => handleDownload("/Rules.pdf", "Rules.pdf")}
                      className="w-fit"
                    >
                      <OutlineButton>
                        <div className="flex items-center justify-center gap-2">
                          <BiDownload />
                          <span>{t("Rulebook")}</span>
                        </div>
                      </OutlineButton>
                    </a>
                  </Reveal>
                  <Reveal classes="">
                    <a
                      onClick={() =>
                        handleDownload(
                          "/ರತ್ನಾವತಿ ಕಲ್ಯಾಣ.pdf",
                          "ರತ್ನಾವತಿ ಕಲ್ಯಾಣ.pdf",
                        )
                      }
                      className="w-fit"
                    >
                      <OutlineButton>
                        <div className="flex items-center justify-center gap-2">
                          <BiDownload />
                          <span>{t("Prasanga")}</span>
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
        <div className="flex min-h-[50vh] min-w-full max-w-7xl items-center overflow-hidden sm:min-h-[70vh] lg:min-h-screen xl:mx-auto">
          <div className="mb-20 flex w-full justify-center sm:mb-24 md:mb-64 lg:mb-72 xl:mx-auto 2xl:hidden">
            <Reel
              classes="blur-sm opacity-[0.47] md:opacity-100"
              baseVelocity={0.5}
              angle={12}
              reelImg={reelImags}
            />
            <Reel
              classes=""
              baseVelocity={-0.75}
              angle={-12}
              reelImg={reelImags}
            />
          </div>
          <div className="hidden w-full justify-center xl:mx-auto 2xl:flex">
            <Reel
              classes=""
              baseVelocity={-1.5}
              angle={0}
              reelImg={reelImags}
            />
          </div>
        </div>

        {/* FAQ */}

        <section className="relative mx-4 flex flex-col gap-3 sm:mx-8 sm:mt-48 md:mt-12 lg:mx-32 xl:mt-20 2xl:mt-0">
          <ScrollLag
            speed={125}
            classes="absolute -z-10 h-48 w-48 lg:h-60 lg:w-60 bottom-[300%] right-full hidden lg:block -translate-y-full opacity-50"
          >
            <div className="">
              <Image
                src={
                  "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/mandala.png"
                }
                fill
                alt=""
                className="select-none object-contain opacity-70 bg-blend-luminosity"
              />
            </div>
          </ScrollLag>
          <div className="relative max-w-7xl xl:left-1/2 xl:-translate-x-1/2">
            <Faq />
          </div>
        </section>
      </div>
    </>
  );
}
