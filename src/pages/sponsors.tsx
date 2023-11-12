import React from "react";
import EventsCard from "~/components/Sponsors/EventsCard";

const SponsorDetails = [
  {
    name: "Ventana Foundation",
    subtitle: "Official Associate Partners",
    description: `Ventana Foundation, founded in 2022 by Rohith Bhat, is a non-profit dedicated to Udupi's well-being. Focused on environmental conservation, cultural revival, education, and community service, we safeguard our roots. By empowering local artists, preserving monuments, and supporting schools, we ensure a sustainable future for our cherished town and its residents.`,
    image: "/1.png",
    url: "https://ventanafoundation.org/eng",
  },
  {
    name: "Quadx Drones",
    subtitle: "Official Executive Partners",
    description: `QuadX Drones, established in 2019, is India's premier online store offering end-to-end drone-related services. Our mission is to provide top-quality DJI equipment and services to the Indian market, delivering an unparalleled level of professionalism and after-sales support. As a result, QuadX Drones has become the most trusted drone provider in India, with a customer base that includes the country's top digital production houses, television channels, and influencers.`,
    image: "/Sponsor/codingninja.png",
    url: "https://www.quadxdrones.com/",
  },
  {
    name: "AJ Institute of Management",
    subtitle: "Official Executive Partners",
    description: `A J Institute of Management, commonly referred to as AJIM, is a renowned educational institution established with a vision to provide quality management education, AJIM has consistently strived for excellence in the field of business and management studies. The institute is known for its commitment to fostering leadership skills, nurturing innovation, and preparing students to excel in the dynamic and competitive business world.`,
    image: "/Sponsor/paramvah.jpg",
    url: "https://ajimmangalore.ac.in/",
  },
];

const Sponsor = () => {
  return (
      <div className="sm:p-4 lg:p-8 mt-[4.75rem] sm:mt-[5.75rem] md:mt-24 lg:mt-[6.25rem]">
        <div className="text-center gap-14 pt-2 flex flex-col">
          <div className="flex flex-col gap-3">
            <h1
              className="font-hindi text-5xl sm:text-7xl md:text-8xl pb-4"
            >
              SPONSORS
            </h1>
            <p className="text-igold text-3xl font-body text-center">
              Big names backing an extraordinary fest.
            </p>
          </div>
          <div className="gap-5 ">
              {SponsorDetails.map((sponorDetail, i) => (
                <EventsCard
                  key={i}
                  rev={i % 2 === 0 ? false : true}
                  ImageSrc={sponorDetail.image}
                  SponsorTitle={sponorDetail.name}
                  SponsorDesc={sponorDetail.description}
                  SponsorWebsiteLink={sponorDetail.url}
                  Subtitle={sponorDetail.subtitle}
                />
              ))}
          </div>
        </div>
      </div>
  );
};

export default Sponsor;




// import React from 'react'
// import HorizontalScroll from '~/components/Sponsors/horizontalScroll';
// // import type { CarouselCardT } from '~/components/Sponsors/carouselCard';
// import Reveal from '~/components/Animations/reveal';
// import { useRouter } from 'next/router';
// import { BiChevronsDown, BiChevronsUp } from 'react-icons/bi'
// import en from '~/locale/en/sponsors';
// import kn from '~/locale/kn/sponsors';

// const Sponsors = () => {
//   const router = useRouter()
//   const t = router.locale === "en" ? en : kn

//   return (
//     <div className="">
//       <div className="fixed top-0 left-0 right-0 bottom-0 -z-50">
//         {/* Video */}
//         <span className='animate-pulse fixed bottom-16 landscape:short:bottom-10 right-1/2 translate-x-1/2'>
//           <BiChevronsDown className='animate-arrow-down text-3xl'></BiChevronsDown>
//         </span>
//       </div>
//       <div className="left-0 h-screen mx-4 sm:mx-8 lg:mx-32 flex flex-col justify-center items-center gap-3 max-w-7xl xl:mx-auto">
//         <Reveal classes="flex h-40 items-center justify-center">
//           <h1 className="font-hindi font-bold text-5xl sm:text-7xl md:text-8xl 2xl:text-9xl text-center">Yakshagavishti</h1>
//         </Reveal>
//         <Reveal classes=''>
//           <p className='text-base sm:text-lg md:text-2xl 2xl:text-4xl px-5 text-center'>Big names backing an extraordinary event.</p>
//         </Reveal>
//       </div>
//       <div className=" max-w-7xl xl:mx-auto">
//         <HorizontalScroll cardsInfo={...t.sponsors} />
//       </div>
//       <div className="flex h-48 items-center justify-center">
//         <span className="animate-pulse font-semibold text-sm sm:text-base md:text-lg xl:text-xl text-center">
//           <BiChevronsUp className='animate-arrow-up text-3xl'></BiChevronsUp>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Sponsors;