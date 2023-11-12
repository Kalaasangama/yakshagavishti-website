import React from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Image from "next/image";
import { Button } from "~/components/ui/button";

import Tilt from 'react-parallax-tilt/dist/index.umd';
// import './ParallaxEffectGlareScale.demozap.scss';
// import '/react-parallax-tilt/ParallaxEffectGlareScale.demozap.css';

type Props = {
  ImageSrc: string;
  SponsorTitle: string;
  SponsorDesc: string;
  SponsorWebsiteLink: string;
  Subtitle: string;
  rev: boolean;
  delay: number;
};

const EventsCard = ({
  ImageSrc,
  SponsorTitle,
  SponsorDesc,
  SponsorWebsiteLink,
  Subtitle,
  rev,
  delay,
}: Props) => {
  return (
    <Tilt
    className="rounded-2xl"
    perspective={2000}
    glareEnable={true}
    glareMaxOpacity={0.25}
    glarePosition="all"
    glareColor="lightblue"
    // scale={1.02}
    >
      <div
        className={`text-center p-10 flex flex-col md:flex-row gap-5 justify-center items-center text-white bg-gradient-to-tl relative overflow-hidden from-primary-50 rounded-2xl shadow-xl shadow-gray-950 ${rev && "md:flex-row-reverse"}`}
      >
        <div className="w-full md:w-1/4 flex justify-center shrink-0 relative">
          <Image className="object-contain object-center max-h-80 h-full w-full" height={500} width={500} src={ImageSrc} alt="Company Logo" />
        </div>
        <div className="w-full md:w-3/4 flex flex-col shrink-0 gap-4">
          <div className="flex flex-col gap-2">
            <h5 className="font-rhomdon text-3xl sm:text-4xl md:text-5xl 2xl:text-5xl">
              {SponsorTitle}
            </h5>
            <h5 className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl text-secondary-100">
              {Subtitle}
            </h5>
          </div>
          <div className="flex flex-col gap-10 md:gap-7">
            <p className="">
              {SponsorDesc}
            </p>
            <a className="self-center" target="_blank" rel="noreferrer" href={SponsorWebsiteLink}>
              <Button size="sm" className="hidden md:block">
                <span className="text-center items-center flex gap-2 p-1">Visit Website <BsBoxArrowUpRight className="text-center align-middle" /></span>
              </Button>
              <Button className="md:hidden">
                <span className="text-center items-center flex gap-2 p-1">Visit Website <BsBoxArrowUpRight className="text-center align-middle" /></span>
              </Button>
            </a>
          </div>
        </div>

        <div style={{animationDelay: `${delay}ms`}} className="animate-right absolute top-0 w-full h-2 bg-indigo-900 blur-md"></div>
        <div style={{animationDelay: `${delay}ms`}} className="animate-top absolute left-0 h-full w-1 bg-indigo-900 blur-md"></div>
        <div style={{animationDelay: `${delay}ms`}} className="animate-left absolute bottom-0 w-full h-2 bg-indigo-900 blur-md"></div>
        <div style={{animationDelay: `${delay}ms`}} className="animate-bottom absolute right-0 h-full w-1 bg-indigo-900 blur-md"></div>
      </div>
    </Tilt>
  );
};

export default EventsCard;