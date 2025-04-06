"use client";

import { useState } from "react";
import Expandable from "~/components/expandable";
import { GiPaperArrow } from "react-icons/gi";
import { BiChevronsDown } from "react-icons/bi";
import { useTranslations } from "next-intl";
import { getAchievements } from "~/utils/translations";

const Achievements = () => {
  const t = useTranslations("Achievements");
  const [contentId, setContentId] = useState(-1);
  const { heading, description, achievements} = getAchievements(t);

  return (
    <main className="no-scrollbar relative top-0 h-screen snap-y snap-mandatory overflow-scroll">
      <div className="flex h-screen snap-start items-center justify-center overflow-x-hidden">
        {/* <video src="https://player.vimeo.com/video/883950133?title=0&byline=0&portrait=0&playsinline=0&muted=1&autoplay=1&autopause=0&controls=0&loop=1&app_id=122963" className="h-screen w-full aspect-video absolute inset-0"></video> */}
        <video
          src="https://res.cloudinary.com/dfhg1joox/video/upload/v1699877866/yakshagavishti/achievementsvideo_e7ayx4.mp4"
          className="absolute inset-0 -z-50 h-screen w-full object-cover"
          autoPlay
          muted
          controls={false}
          loop
          playsInline
        ></video>
        <div className="absolute inset-0 -z-20 h-screen w-full bg-gradient-to-t from-black/50 to-black/50"></div>
        <div>
          <div className="text-center font-rhomdon text-5xl font-bold sm:text-7xl md:text-8xl 2xl:text-9xl ">
            {heading}
          </div>
          <br />
          <p className="font-body text-center text-3xl text-secondary-100">
            {description}
          </p>
        </div>
        <span className="fixed bottom-16 right-1/2 -z-10 translate-x-1/2 animate-pulse landscape:short:bottom-10">
          <BiChevronsDown className="animate-arrow-down text-3xl"></BiChevronsDown>
        </span>
      </div>
      <section className="relative snap-start">
        <div className="no-scrollbar flex h-screen w-screen snap-y snap-mandatory flex-col items-center overflow-scroll bg-gradient-to-br from-primary-100 to-[#100D27] px-4 sm:px-8 lg:px-32">
          <div className="w-full ">
            {achievements.map((ach, idx) => {
              if (idx % 2 === 0) {
                const row = [
                  {
                    contentId: idx,
                    img: ach.image,
                  },
                ];

                const nextAchievement = achievements[idx + 1];
                if (nextAchievement) {
                  row.push({
                    contentId: idx + 1,
                    img: nextAchievement.image,
                  });
                }

                return (
                  <div
                    key={idx}
                    className="group/page relative flex h-screen w-full snap-start flex-col items-center justify-start gap-10 sm:justify-center"
                  >
                    <div className="mt-32 w-full px-4 sm:mt-0 sm:px-8 md:mb-16 lg:px-32 xl:w-[1280px]">
                      <Expandable
                        key={idx}
                        cards={row}
                        setContentId={setContentId}
                        direction={idx % 4 == 0 ? "" : "-"}
                      />
                    </div>
                    <div className="absolute bottom-24 hidden  h-48 flex-col items-center justify-center gap-4 group-hover/page:flex sm:bottom-10 sm:h-fit md:bottom-3 md:h-48 md:gap-3 landscape:short:bottom-0 landscape:short:h-fit">
                      <div
                        data-id={`${idx}`}
                        className="flex justify-center text-center text-lg text-secondary-100 sm:text-xl md:text-2xl"
                      >
                        {achievements[contentId]?.title}
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2 md:gap-1">
                        {achievements[contentId]?.team && (
                          <div className="flex items-center gap-3 text-base md:text-lg xl:text-xl">
                            <GiPaperArrow className="-rotate-45 select-none text-secondary-100" />
                            <div className="">
                              {achievements[contentId]?.team}
                            </div>
                          </div>
                        )}
                        {achievements[contentId]?.individual.map((ind, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 text-base md:text-lg xl:text-xl"
                          >
                            <GiPaperArrow className="-rotate-45 select-none text-secondary-100" />
                            <div className="">{ind}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Achievements;
