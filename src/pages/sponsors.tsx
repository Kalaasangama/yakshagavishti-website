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
    subtitle: "Official Executive Partners",
    description: `QuadX Drones, established in 2019, is India's premier online store offering end-to-end drone-related services. Our mission is to provide top-quality DJI equipment and services to the Indian market, delivering an unparalleled level of professionalism and after-sales support. As a result, QuadX Drones has become the most trusted drone provider in India, with a customer base that includes the country's top digital production houses, television channels, and influencers.`,
    image: "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/sponsors/Quadx Drones.png",
    url: "https://www.quadxdrones.com/",
  },
  {
    name: "AJ Institute of Management",
    subtitle: "Official Executive Partners",
    description: `A J Institute of Management, commonly referred to as AJIM, is a renowned educational institution established with a vision to provide quality management education, AJIM has consistently strived for excellence in the field of business and management studies. The institute is known for its commitment to fostering leadership skills, nurturing innovation, and preparing students to excel in the dynamic and competitive business world.`,
    image: "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/sponsors/AJ Institute of Management.png",
    url: "https://ajimmangalore.ac.in/",
  },
];

const Sponsor = () => {
  return (
      <div className="sm:p-4 lg:p-8 mt-[4.75rem] sm:mt-[5.75rem] md:mt-24 lg:mt-[6.25rem] mb-10">
        <div className="text-center gap-14 pt-10 md:pt-2 flex flex-col justify-center items-center">
          <div className="flex flex-col py-5">
            <h1
              className="font-rhomdon text-5xl sm:text-7xl md:text-8xl pb-4"
            >
              SPONSORS
            </h1>
            <p className="text-secondary-100 text-3xl font-body text-center">
              Big names backing an extraordinary event.
            </p>
          </div>
          <div className="gap-7 mx-4 sm:mx-8 lg:mx-32 flex flex-col max-w-7xl">
              {SponsorDetails.map((sponorDetail, i) => (
                <EventsCard
                  delay={i * 1000}
                  key={i}
                  rev={i % 2 === 0 ? false : true}
                  ImageSrc={`https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/sponsors/${sponorDetail.name.replaceAll(' ', '_')}.png`}
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