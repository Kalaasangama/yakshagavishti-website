"use client";

import { useState } from "react";
import Expandable from "~/components/expandable";
import { GiPaperArrow } from "react-icons/gi";
import { BiChevronsDown } from "react-icons/bi";
import { useTranslations } from "next-intl";

const achievements: { title: string; team?: string; individual: string[] }[] = [
  {
    title: "SDM College Yakshothsava 2023 (March 11, 2023)",
    team: "First prize in the overall team category.",
    individual: [
      "Varun Acharya - First place, individual category",
      "Saritha Rao - Consolation prize, individual category",
    ],
  },
  {
    title: "Yakshayaana at Govinda Dasa College (April 8, 2023)",
    team: undefined,
    individual: ["Pranav Moodithaya - First place, individual Hasya category"],
  },
  {
    title: "AJ Institute of Management - Yakshakalothsava (April 20, 2023)",
    team: undefined,
    individual: ["Anwesh R Shetty - First place in the Raja Vesha category"],
  },
  {
    title: "Patla Sambhrama 2023 (May 27, 2023)",
    team: "First-place in the overall team category among 22 participating teams.",
    individual: [
      "Varun Acharya - Second place, Pundu Vesha",
      "Anwesh R Shetty - First place, Raja Vesha",
      "Pranav Moodithaya - First place, Hasya",
      "T M Shravan - First place, Poshaka Patra",
    ],
  },
  {
    title: "Bhramari Yaksha Jhenkara 2023 (May 30, 2023)",
    team: "First place in the overall category.",
    individual: [
      "Pranav Moodithaya - First place in the individual Hasya category",
      "Anwesh R Shetty - Overall individual third place",
      "Varun Acharya - Overall individual first place",
    ],
  },
  {
    title: "Yaksha Pranava (October 8, 2023)",
    team: "First runner-up position among the nine participating teams.",
    individual: [
      "Anwesh R Shetty - Best Kireeta Vesha (Role: Nibandhana)",
      "Varun Acharya - Best Pundu Vesha (Role: Satyavratha)",
      "Rajath Bola - Overall Second Samagra Vayaktika (Best Individual Artist, Role:Choodamani)",
    ],
  },
  {
    title: "SDM College Yakshothsava 2024 (Feb 23-25, 2024)",
    team: "First prize in the overall team category.",
    individual: [
      "Anwesh R Shetty - Overall First Samagra Vayaktika",
      "Varun U Acharya - Overall Third Samagra Vayaktika",
      "TM Shravan Acharya - Best character in team",
    ],
  },
  {
    title: "AJ Institute of Management - Yakshakalothsava (March 6, 2024)",
    team: "First prize in the overall team category.",
    individual: [],
  },
  {
    title: "Bhramari Yaksha Jhenkara 2024 (April 4, 2024)",
    team: "First prize in the overall team category.",
    individual: [
      "Adv. Prashanth Aithal - Overall Second Samagra Vayaktika, Best character in team",
      "Anwesh R Shetty - First Kireeta-vesha category",
      "Rajath Bola - First Hasya-vesha category",
      "Srikrishna Rao K S - First Bannada-vesha category",
    ],
  },
  {
    title: "SDM College Yakshothsava 2025 (March 22-23, 2025)",
    team: "First prize in the overall team category.",
    individual: [
      "Jithesh K Nayak - Overall First Samagra Vayaktika",
      "Srivathsa Skanda Bhat - First Hasya-vesha",
      "Varun U Acharya - First Kireeta-vesha",
      "Sudiptha Manai - First Stree-vesha",
    ],
  },
  {
    title: "AJ Institute of Management - Yakshakalothsava 2025",
    team: "First prize in the overall team category.",
    individual: ["Jithesh K Nayak - 1st pundu vesha category"],
  },
];

const Achievements = () => {
  const t = useTranslations("Achievements");
  const [contentId, setContentId] = useState(-1);

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
            {t("Heading")}
          </div>
          <br />
          <p className="font-body text-center text-3xl text-secondary-100">
            {t("Description")}
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
                    img: `https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/achievements/${idx + 1}.jpg`,
                  },
                ];

                const nextAchievement = achievements[idx + 1];
                if (nextAchievement) {
                  row.push({
                    contentId: idx + 1,
                    img: `https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/achievements/${idx + 2}.jpg`,
                  });
                }

                // const secNextAchievement = t.achievements[idx + 2]
                // secNextAchievement && row.push({...secNextAchievement, img: `/${idx+3}.jpg`})

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
