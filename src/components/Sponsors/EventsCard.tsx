"use client";

import React from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Image from "next/image";
import { Button } from "~/components/ui/button";

import Tilt from "react-parallax-tilt";
import Link from "next/link";
import { useTranslations } from "next-intl";
// import './ParallaxEffectGlareScale.demozap.scss';
// import '/react-parallax-tilt/ParallaxEffectGlareScale.demozap.css';

type Props = {
  ImageSrc: string;
  SponsorTitle: string;
  SponsorDesc: string;
  SponsorWebsiteLink?: string;
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
  const t = useTranslations("Sponsors");

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
        className={`relative flex flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl bg-gradient-to-tl from-primary-50 p-10 text-center text-white shadow-xl shadow-gray-950 md:flex-row ${rev && "md:flex-row-reverse"}`}
      >
        <div className="relative flex w-full shrink-0 justify-center md:w-1/4">
          <Image
            className="h-full max-h-80 w-full object-contain object-center"
            height={500}
            width={500}
            src={ImageSrc}
            alt="Company Logo"
          />
        </div>
        <div className="flex w-full shrink-0 flex-col gap-4 md:w-3/4">
          <div className="flex flex-col gap-2">
            <h5 className="font-rhomdon text-3xl sm:text-4xl md:text-5xl 2xl:text-5xl">
              {SponsorTitle}
            </h5>
            <h5 className="text-lg text-secondary-100 sm:text-xl md:text-2xl 2xl:text-3xl">
              {Subtitle}
            </h5>
          </div>
          <div className="flex flex-col gap-10 md:gap-7">
            <p className="">{SponsorDesc}</p>
            {SponsorWebsiteLink && (
              <Link
                className="self-center"
                target="_blank"
                rel="noreferrer"
                href={SponsorWebsiteLink}
              >
                <Button size="sm" className="hidden md:block">
                  <span className="flex items-center gap-2 p-[0.5] text-center">
                    <p className="mt-[9]">{t("Visit")}</p>{" "}
                    <BsBoxArrowUpRight className="text-center align-middle" />
                  </span>
                </Button>
                <Button className="md:hidden">
                  <span className="flex items-center gap-2 p-[0.5] text-center">
                    <p className="mt-[9]">{t("Visit")}</p>{" "}
                    <BsBoxArrowUpRight className="text-center align-middle" />
                  </span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div
          style={{ animationDelay: `${delay}ms` }}
          className="absolute top-0 h-2 w-full animate-right bg-indigo-900 blur-md"
        ></div>
        <div
          style={{ animationDelay: `${delay}ms` }}
          className="absolute left-0 h-full w-1 animate-top bg-indigo-900 blur-md"
        ></div>
        <div
          style={{ animationDelay: `${delay}ms` }}
          className="absolute bottom-0 h-2 w-full animate-left bg-indigo-900 blur-md"
        ></div>
        <div
          style={{ animationDelay: `${delay}ms` }}
          className="absolute right-0 h-full w-1 animate-bottom bg-indigo-900 blur-md"
        ></div>
      </div>
    </Tilt>
  );
};

export default EventsCard;
