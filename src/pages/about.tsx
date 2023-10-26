import React from "react";
import Banner from "~/components/About/Banner";
import MyComponent from "~/components/About/CardsSection";
import Reveal from "~/components/Animations/reveal";

const Index = () => {
  const banner1Photos = "/collegeAbout.webp";
  const banner1Text = "About NMAMIT";

  const banner2Photos = "/collegeAbout.webp";
  const banner2Text = "Team Yakshasangama";
  return (
    <section className="pt-2">
      <Banner photo={banner1Photos} text={banner1Text}/>
      <div className="m-10 py-6">
        <div className="container m-auto px-6 md:px-12 xl:px-6">
          <div className="space-y-6 md:flex md:gap-6 md:space-y-0 lg:items-center lg:gap-12">
            <Reveal classes="lg:mx-15 mx-0 md:w-5/12 lg:w-5/12">
              <img
                src="/nitteLogoWhite.webp"
                alt="image"
                loading="lazy"
                className=" max-w-full justify-center sm:mx-0 sm:flex sm:h-52 md:mx-0  md:mt-48 md:h-20 md:w-auto lg:mt-0 lg:h-28 lg:w-96 xl:mx-16"
              />
            </Reveal>
            <div className="sm:mx-4 md:w-6/12 lg:mx-0 lg:w-6/12">
              <Reveal classes="">
                <h2 className="inline-block border-b border-[#D9A15C] font-hindi text-xl font-bold sm:text-4xl md:text-4xl 2xl:text-5xl">
                  About NMAMIT
                </h2>
              </Reveal>
              <Reveal classes="">
                <p className="mt-6 text-justify text-xs sm:text-sm md:text-base lg:text-base xl:text-lg">
                  Nitte Mahalinga Adyantaya Memorial Institute of
                  Technology(NMAMIT), Nitte, established in 1986 and recognized
                  by the All India Council for Technical Education, New Delhi,
                  has been a constituent college of Nitte (Deemed to be
                  University), Mangaluru, since June 2022.
                </p>
              </Reveal>
              <Reveal classes="">
                <p className="mt-4 text-justify text-xs sm:text-sm md:text-base lg:text-base xl:text-lg">
                  Ranked 175 in the National Institutional Ranking Framework
                  (NIRF) 2022 by MHRD, GoI among the engineering colleges in
                  India, the College has been placed under the <q>Platinum</q>
                  category for having high industry linkages by the AICTE-CII
                  Survey of Industry-Linked Technical Institutes 2020. NMAMIT,
                  the off-campus centre of Nitte DU located at Nitte Village,
                  has active collaborations with several international
                  universities and organizations for faculty and student
                  exchanges, research, internships, and placements. (For
                  details, visit www.nmamit.nitte.edu.in)
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20"></div>
      <Banner photo={banner2Photos} text={banner2Text} />
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
                <h2 className="inline-block border-b border-[#D9A15C] font-hindi text-xl font-bold sm:text-4xl md:text-4xl 2xl:text-5xl">
                  Team Yakshasangama
                </h2>
              </Reveal>
              <Reveal classes="">
                <p className="mt-6 text-justify text-xs sm:text-sm md:text-base lg:text-base xl:text-lg">
                  In just a year since our inception, Team Yakshasangama has
                  emerged as a promising team of young artists across the off
                  centre campus of Nitte DU, securing champion titles in three
                  out of five competitions and numerous individual prizes.
                </p>
              </Reveal>
              <Reveal classes="">
                <p className="mt-4 text-justify text-xs sm:text-sm md:text-base lg:text-base xl:text-lg">
                  Our passion for Yakshagana fuels our journey, and we are
                  excited to continue this remarkable ascent in the world of
                  this cherished art form.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-16 flex items-center justify-center px-6 pt-4 font-hindi text-xl font-bold sm:text-4xl md:text-4xl 2xl:text-5xl">
          <Reveal classes="">
            <span className="border-b border-[#D9A15C]">Our Members</span>
          </Reveal>
        </div>
        <MyComponent />
      </div>
    </section>
  );
};

export default Index;
