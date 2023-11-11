import React from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Image from "next/image";
import { Button } from "../Button";

type Props = {
  ImageSrc: string;
  SponsorTitle: string;
  SponsorDesc: string;
  SponsorWebsiteLink: string;
  Subtitle: string;
  rev: boolean;
};

const EventsCard = ({
  ImageSrc,
  SponsorTitle,
  SponsorDesc,
  SponsorWebsiteLink,
  Subtitle,
  rev,
}: Props) => {
  return (
    <>
      <div
        className={`text-center px-3 py-4 md:p-5 h-auto  md:h-[50vh] w-[80vw] m-auto flex flex-col  md:flex-row ${
          rev ? "flex-col md:flex-row-reverse" : ""
        } gap-3 justify-center md:justify-evenly items-center text-white py-4 lg:p-8 bg-gradient-to-tl from-primary-50 my-5 hover:shadow-xl transition-all duration-300`}
      >
        <div className="w-full md:w-[50%] h-full relative">
          <Image className="object-contain object-center h-full w-full" height={500} width={500} src={ImageSrc} alt="company logo" />
        </div>
        <div className="w-[90%] flex flex-col justify-center py-0  mx-auto my-3 sm:py-2 gap-4 px-0 md:px-8">
          <h5 className="event__heading text-3xl font-subheading">
            {SponsorTitle}
          </h5>
          <h5 className="text-center  text-md  text-igold font-body">
            {Subtitle}
          </h5>
          <p className="event__description text-justify font-body">
            {SponsorDesc}
          </p>
          <a className="self-center" target="_blank" rel="noreferrer" href={SponsorWebsiteLink}>
            <Button>
              <span className="text-center items-center flex gap-2">Visit Website <BsBoxArrowUpRight className="text-center align-middle" /></span>
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default EventsCard;