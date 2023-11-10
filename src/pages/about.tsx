import { useRouter } from "next/router";
import React from "react";
import Banner from "~/components/About/Banner";
import AboutCardsSection from "~/components/About/CardsSection";
import Reveal from "~/components/Animations/reveal";
import en from "~/locale/en/about";
import kn from "~/locale/kn/about";

const Index = () => {
  const router = useRouter()
  const t = router.locale === "en" ? en : kn

  return (
    <section className="mt-[4.75rem] sm:mt-[5.75rem] md:mt-24 lg:mt-[6.25rem]">
      <Banner photo={"/collegeAbout.webp"} text={`${t.head[0]} ${t.head[1]}`}/>
      <div className="m-10 py-6">
        <div className="container m-auto px-6 md:px-12 xl:px-6">
          <div className="space-y-6 md:flex md:gap-6 md:space-y-0 lg:items-center lg:gap-12">
            <Reveal classes="lg:mx-15 mx-0 md:w-5/12 lg:w-5/12">
              <img
                src="/nitteLogoWhite.webp"
                alt="image"
                loading="lazy"
                className=" max-w-full justify-center sm:mx-0 sm:flex sm:h-52 md:mx-0  md:mt-48 md:h-20 md:w-auto lg:mt-0 lg:h-28 lg:w-96 xl:mx-16 object-contain"
              />
            </Reveal>
            <div className="sm:mx-4 md:w-6/12 lg:mx-0 lg:w-6/12">
              <Reveal classes="">
                <h2 className="inline-block font-hindi text-xl sm:text-4xl md:text-4xl 2xl:text-5xl">
                  {`${t.head[0]}`} <span className="text-secondary-100">{`${t.head[1]}`}</span>
                </h2>
              </Reveal>
              <Reveal classes="">
                <p className="mt-6 text-justify text-xs sm:text-sm md:text-base lg:text-base xl:text-lg">
                  {t.content1}
                </p>
              </Reveal>
              <Reveal classes="">
                <p className="mt-4 text-justify text-xs sm:text-sm md:text-base lg:text-base xl:text-lg">
                  {t.content2}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20"></div>
      <Banner photo={"/kalateam.jpg"} text={`${t.tHead[0]} ${t.tHead[1]}`} />
      <div className="m-10 py-6">
        <div className="container m-auto px-6 md:px-12 xl:px-6">
          <div className="flex flex-col items-center space-y-6 md:flex-row md:gap-6 md:space-y-0 lg:items-center lg:gap-12">
            <Reveal classes="lg:mx-15 mx-0 md:w-5/12 lg:w-5/12">
              <img
                src="/1.png"
                alt="image"
                loading="lazy"
                className=" sm: h-52 max-w-full justify-center rounded-2xl sm:mx-0 sm:flex sm:h-72  md:mx-0 md:w-auto lg:h-96 xl:mx-16"
              />
            </Reveal>
            <div className="sm:mx-4 md:w-6/12 lg:mx-0 lg:w-6/12">
              <Reveal classes="">
                <h2 className="inline-block font-hindi text-xl  sm:text-4xl md:text-4xl 2xl:text-5xl">
                  {`${t.tHead[0]}`} <span className="text-secondary-100">{`${t.tHead[1]}`}</span>
                </h2>
              </Reveal>
              <Reveal classes="">
                <p className="mt-6 text-justify text-xs sm:text-sm md:text-base lg:text-base xl:text-lg">
                  {t.tContent1}
                </p>
              </Reveal>
              <Reveal classes="">
                <p className="mt-4 text-justify text-xs sm:text-sm md:text-base lg:text-base xl:text-lg">
                  {t.tContent2}
                </p>
              </Reveal>
              <Reveal classes="">
                <p className="mt-4 text-justify text-xs sm:text-sm md:text-base lg:text-base xl:text-lg">
                Meet the people behind the scenes.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-16 flex flex-col items-center justify-center px-6 pt-4 text-xl font-bold sm:text-4xl md:text-4xl 2xl:text-5xl">
          <Reveal classes="">
            <span className="font-hindi text-5xl">{`${t.mHead[0]}`} <span className="text-secondary-100">{`${t.mHead[1]}`}</span></span>
          </Reveal>
          <Reveal classes="">
          <p className="mt-4 text-justify text-xs sm:text-sm md:text-base xl:text-xl">
                Meet the people behind the scenes
                </p>
          </Reveal>
        </div>
        <AboutCardsSection />
      </div>
    </section>
  );
};

export default Index;
