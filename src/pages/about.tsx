import Image from "next/image";
import React from "react";
import Banner from "~/components/About/Banner";
import AboutCardsSection from "~/components/About/CardsSection";
import Reveal from "~/components/Animations/reveal";

const Index = () => {
  return (
    <section className="mt-[4.75rem] sm:mt-[5.75rem] md:mt-24 lg:mt-[6.25rem] flex flex-col gap-48 justify-center items-center">
      <div className="flex flex-col h-screen min-h-min justify-around gap-10 items-center">
          <Banner video={"https://vimeo.com/883551016?share=copy"} text="" credits="Video: Glen Rebello"/>
          <div className="mx-4 sm:mx-8 lg:mx-32 flex flex-col md:flex-row gap-10 justify-center items-center max-w-7xl">
            <Reveal classes="w-full md:w-1/3">
              <Image
                src="https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/about/nitteLogo.png"
                alt="image"
                loading="lazy"
                className="object-contain h-full w-full object-center"
                height={500}
                width={500}
              />
            </Reveal>
            <div className="w-full md:w-2/3 flex flex-col text-center md:text-left gap-7 md:gap-5">
              <Reveal classes="">
                <h2 className="font-rhomdon text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl">
                About <span className="text-secondary-100">NMAMIT</span>
                </h2>
              </Reveal>
              <div className="flex flex-col gap-3">
                <Reveal classes="">
                  <p className="text-base md:text-lg xl:text-xl">
                    Nitte Mahalinga Adyantaya Memorial Institute of Technology (NMAMIT), Nitte, established in 1986 and recognized by the All India Council for Technical Education, New Delhi, has been a constituent college of Nitte University, Mangaluru, since June 2022.
                  </p>
                </Reveal>
                <Reveal classes="">
                  <p className="text-base md:text-lg xl:text-xl">
                    Ranked 175 in the National Institutional Ranking Framework (NIRF) 2022 by MHRD, GoI among the engineering colleges in India, the College has been placed under the <q>Platinum</q> category for having high industry linkages by the AICTE-CII Survey of Industry-Linked Technical Institutes 2020. For details, visit www.nmamit.nitte.edu.in
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
      </div>
      <div className="flex flex-col h-screen min-h-min justify-around gap-10 items-center">
          <Banner photo={"https://res.cloudinary.com/dfhg1joox/image/upload/v1699901394/yakshagavishti/kalateam.jpg"} text=""/>
          <div className="mx-4 sm:mx-8 lg:mx-32 flex flex-col md:flex-row gap-10 justify-center items-center max-w-7xl">
            <Reveal classes="w-full md:w-1/3 flex justify-center items-center">
              <Image
                src="https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/home/kalaasangamalogo.png"
                alt="image"
                loading="lazy"
                className="object-contain h-full md:w-full object-center w-48 max-w-[16rem]"
                height={500}
                width={500}
              />
            </Reveal>
            <div className="w-full md:w-2/3 flex flex-col text-center md:text-left gap-7 md:gap-5">
              <Reveal classes="">
                  <h2 className="font-rhomdon text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl">
                  Team <span className="text-secondary-100">Yakshasangama</span>
                  </h2>
              </Reveal>
              <div className="flex flex-col gap-3">
                <Reveal classes="">
                  <p className="text-base md:text-lg xl:text-xl">
                    In just a year since our inception, Team Yakshasangama has emerged as a promising team of young artists across the off centre campus of Nitte DU, securing champion titles in four out of six competitions and numerous individual prizes.
                  </p>
                </Reveal>
                <Reveal classes="">
                  <p className="text-base md:text-lg xl:text-xl">
                    Our passion for Yakshagana fuels our journey, and we are excited to continue this remarkable ascent in the world of this cherished art form.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
      </div>
        <div className="mb-16 mx-4 sm:mx-8 lg:mx-32 flex flex-col items-center justify-center text-xl font-bold sm:text-4xl md:text-4xl 2xl:text-5xl max-w-7xl">
          <Reveal classes="">
            <span className="font-rhomdon text-5xl font-normal">Our <span className="text-secondary-100">Members</span></span>
          </Reveal>
          <Reveal classes="">
          <p className="mt-4 text-justify text-base sm:text-lg md:text-xl xl:text-2xl">
                Meet the people behind the scenes
                </p>
          </Reveal>
          <AboutCardsSection />
        </div>
    </section>
  );
};

export default Index;
