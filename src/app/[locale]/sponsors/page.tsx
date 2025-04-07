import { useTranslations } from "next-intl";
import React from "react";
import EventsCard from "~/components/Sponsors/EventsCard";

const Sponsor = () => {
  const t = useTranslations("Sponsors");

  const SponsorDetails = [
    {
      name: "WENAMITAA",
      subtitle: t("Associate"),
      description: `Established in 1991 and registered in 2013, the WENAMITAA, NMAMIT Alumni Association signifies the enduring bond between alumni and their alma mater. With vibrant chapters like Me-NMAMIT and Be-NMAMIT, the association fosters connections through annual gatherings. Highlight events, including the annual Alumni Meet and biennial Global Meet, provide opportunities for alumni to relive academic memories and celebrate achievements globally. The association, beyond celebrations, sponsors academic excellence and funds student projects, exemplified by the recent inauguration of a conference hall in the Atal Block. Actively involving alumni in academic endeavors, NMAMIT seeks their input for curriculum development and invites them as esteemed judges during fests, underscoring a commitment to excellence.`,
      image:
        "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/sponsors/WENAMITAA.png",
      url: "https://alumni.nitte.edu.in/page/wenamitaa-607",
    },
    {
      name: "Quadx Drones",
      subtitle: t("Executive"),
      description: `QuadX Drones, established in 2019, is India's premier online store offering end-to-end drone-related services. Our mission is to provide top-quality DJI equipment and services to the Indian market, delivering an unparalleled level of professionalism and after-sales support. As a result, QuadX Drones has become the most trusted drone provider in India, with a customer base that includes the country's top digital production houses, television channels, and influencers.`,
      image: "",
      url: "https://www.quadxdrones.com/",
    },
    {
      name: "Muliya Jewels",
      subtitle: t("Executive"),
      description: `Muliya Jewels was established in 1944, by Mr. Keshava Bhatta, at Court Road Puttur, which is 54 Kilometers away from Mangalore. We have more than 75 years of expertise and trust in the field of jewllery. We are happy to realize your desire to have dream jewels from array of overwhelming collection at Muliya.`,
      image: "/1.png",
      url: "https://muliya.in/",
    },
  ];

  return (
    <div className="mb-10 mt-[4.75rem] sm:mt-[5.75rem] sm:p-4 md:mt-24 lg:mt-[6.25rem] lg:p-8">
      <div className="flex flex-col items-center justify-center gap-14 pt-10 text-center md:pt-2">
        <div className="flex flex-col py-5">
          <h1 className="pb-4 font-rhomdon text-5xl sm:text-7xl md:text-8xl">
            {t("Heading")}
          </h1>
          <p className="font-body text-center text-3xl text-secondary-100">
            {t("Description")}
          </p>
        </div>
        <div className="mx-4 flex max-w-7xl flex-col gap-7 sm:mx-8 lg:mx-32">
          {SponsorDetails.map((sponorDetail, i) => (
            <EventsCard
              delay={i * 1000}
              key={i}
              rev={i % 2 === 0 ? false : true}
              ImageSrc={`https://res.cloudinary.com/dfhg1joox/image/upload/v1699890929/yakshagavishti/assets/sponsors/${sponorDetail.name.replaceAll(" ", "_")}.png`}
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
