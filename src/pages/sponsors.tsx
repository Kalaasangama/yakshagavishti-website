import React from "react";
import EventsCard from "~/components/Sponsors/EventsCard";

const SponsorDetails = [
  {
    name: "Wipfli",
    subtitle: "Official Title Sponsor",
    description: `Wipfli brings the curiosity needed to uncover what's been overlooked. Our ingenuity helps create unexpected results. Our team of more than 3,000 associates works together to bring integrated solutions to turn data into insights, to optimize workflows, to increase margins and to transform through digital innovation`,
    image: "/1.png",
    url: "https://www.wipfli.com/",
  },
  {
    name: "Coding Ninjas",
    subtitle: "Official ED-Tech Sponsor",
    description: `At Coding Ninjas' mission is to continuously innovate the best ways to train the next generation of developers and to transform the the way tech education is delivered.
      Coding Ninjas boasts of world-class teaching faculty and a state-of-art learning platform for Coding education with faculty alumni of IIT, Stanford, IIIT and Facebook. Coding Ninjas teaches 17+ Programming courses ins Machine Learning, Data Science, Web Development, Android and more.`,
    image: "/Sponsor/codingninja.png",
    url: "https://www.codingninjas.com/",
  },
  {
    name: "Paramvah Studios",
    subtitle: "Official Event Sponsor for NAVARASA",
    description: `Paramvah Studios aims to be a world class production house creating memorable films & characters using latest technologies & best creative talents. We are a production house, engaged in creating movie content and Paramvah Studios is more than just a name for us.`,
    image: "/Sponsor/paramvah.jpg",
    url: "https://www.paramvah.com/",
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