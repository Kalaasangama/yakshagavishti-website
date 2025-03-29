import { useTranslations } from "next-intl";
import React from "react";
import EventsCard from "~/components/Sponsors/EventsCard";

const Sponsor = () => {
    const t = useTranslations("Sponsors");

    const SponsorDetails = [
        {
          name: "Adarsh Sudhakar Hegde",
          subtitle: t("Title"),
          description: `Mr. Adarsh Sudhakar Hegde, is a philanthropist and an admirer of the Yakshagaana who wo started his career as Assistant Maintenance Engineer in 1987. Presently he is the Joint Managing Director and Executive Director of Allcargo Logistics Limited. He is also a partner at SKS Netgate LLP and part of the board of directors in 25 other companies. He is the current President of Container Freight Association of India.`,
          image: "/1.png",
          url: "",
        },
        {
          name: "Ventana Foundation",
          subtitle: t("Associate"),
          description: `Ventana Foundation, founded in 2022 by Rohith Bhat, is a non-profit dedicated to Udupi's well-being. Focused on environmental conservation, cultural revival, education, and community service, we safeguard our roots. By empowering local artists, preserving monuments, and supporting schools, we ensure a sustainable future for our cherished town and its residents.`,
          image: "/1.png",
          url: "https://ventanafoundation.org/eng",
        },
        {
          name: "AJ Institute of Management",
          subtitle: t("Associate"),
          description: `A J Institute of Management, commonly referred to as AJIM, is a renowned educational institution established with a vision to provide quality management education, AJIM has consistently strived for excellence in the field of business and management studies. The institute is known for its commitment to fostering leadership skills, nurturing innovation, and preparing students to excel in the dynamic and competitive business world.`,
          image: "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/sponsors/AJ Institute of Management.png",
          url: "https://ajimmangalore.ac.in/",
        },
        {
          name: "WENAMITAA",
          subtitle: t("Associate"),
          description: `Established in 1991 and registered in 2013, the WENAMITAA, NMAMIT Alumni Association signifies the enduring bond between alumni and their alma mater. With vibrant chapters like Me-NMAMIT and Be-NMAMIT, the association fosters connections through annual gatherings. Highlight events, including the annual Alumni Meet and biennial Global Meet, provide opportunities for alumni to relive academic memories and celebrate achievements globally. The association, beyond celebrations, sponsors academic excellence and funds student projects, exemplified by the recent inauguration of a conference hall in the Atal Block. Actively involving alumni in academic endeavors, NMAMIT seeks their input for curriculum development and invites them as esteemed judges during fests, underscoring a commitment to excellence.`,
          image: "https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/sponsors/WENAMITAA.png",
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
          name: "Agari Enterprises",
          subtitle: t("Executive"),
          description: `Agari Enterprises is a leading retail brand that has been serving the community since 1992. Specializing in electronics and furniture, our stores offer a wide range of high-quality products at competitive prices. Whether you're looking for the latest gadgets or stylish home furnishings, we have everything you need to make your life more comfortable and convenient. At Agari Enterprises, we pride ourselves on providing exceptional customer service and expert advice. Our knowledgeable staff are always on hand to help you find the perfect product to suit your needs and budget. Plus, with our convenient online store, you can browse and shop from the comfort of your own home.`,
          image: "/1.png",
          url: "https://agarienterprises.com/",
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
        <div className="sm:p-4 lg:p-8 mt-[4.75rem] sm:mt-[5.75rem] md:mt-24 lg:mt-[6.25rem] mb-10">
            <div className="text-center gap-14 pt-10 md:pt-2 flex flex-col justify-center items-center">
                <div className="flex flex-col py-5">
                    <h1
                    className="font-rhomdon text-5xl sm:text-7xl md:text-8xl pb-4"
                    >
                    {t("Heading")}
                    </h1>
                    <p className="text-secondary-100 text-3xl font-body text-center">
                    {t("Description")}
                    </p>
                </div>
                <div className="gap-7 mx-4 sm:mx-8 lg:mx-32 flex flex-col max-w-7xl">
                    {SponsorDetails.map((sponorDetail, i) => (
                        <EventsCard
                        delay={i * 1000}
                        key={i}
                        rev={i % 2 === 0 ? false : true}
                        ImageSrc={`https://res.cloudinary.com/dfhg1joox/image/upload/v1699890929/yakshagavishti/assets/sponsors/${sponorDetail.name.replaceAll(' ', '_')}.png`}
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