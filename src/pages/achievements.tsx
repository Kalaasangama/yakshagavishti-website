import { useState } from "react";
import Expandable from "~/components/expandable";
import { GiPaperArrow } from "react-icons/gi"
import { BiChevronsDown } from "react-icons/bi"
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const achievements = [
  {
    title: "SDM College Yakshothsava 2023 (March 11, 2023)",
    team: "First prize in the overall team category.",
    individual: ["Varun Acharya - First place, individual category", "Saritha Rao - Consolation prize, individual category"]
  },
  {
    title: "Yakshayaana at Govinda Dasa College (April 8, 2023)",
    team: undefined,
    individual: ["Pranav Moodithaya - First place, individual Hasya category",]
  },
  {
    title: "AJ Institute of Management - Yakshakalothsava (April 20, 2023)",
    team: undefined,
    individual: ["Anwesh R Shetty - First place in the Raja Vesha category"]
  },
  {
    title: "Patla Sambhrama 2023 (May 27, 2023)",
    team: "First-place in the overall team category among 22 participating teams.",
    individual: ["Varun Acharya - Second place, Pundu Vesha", "Anwesh R Shetty - First place, Raja Vesha", "Pranav Moodithaya - First place, Hasya", "T M Shravan - First place, Poshaka Patra"]
  },
  {
    title: "Bhramari Yaksha Jhenkara 2023 (May 30, 2023)",
    team: "First place in the overall category.",
    individual: ["Pranav Moodithaya - First place in the individual Hasya category", "Anwesh R Shetty - Overall individual third place", "Varun Acharya - Overall individual first place"]
  },
  {
    title: "Yaksha Pranava (October 8, 2023)",
    team: "First runner-up position among the nine participating teams.",
    individual: ["Anwesh R Shetty - Best Kireeta Vesha (Role: Nibandhana)", "Varun Acharya - Best Pundu Vesha (Role: Satyavratha)", "Rajath Bola - Overall Second Samagra Vayaktika (Best Individual Artist, Role:Choodamani)"]
  },
]

const Achievements = () => {
  const [contentId, setContentId] = useState(-1)

  return (
    <main className="snap-y snap-mandatory h-screen overflow-scroll no-scrollbar relative top-0">
      <div className="h-screen flex items-center justify-center snap-start overflow-x-hidden">
        {/* <video src="https://player.vimeo.com/video/883950133?title=0&byline=0&portrait=0&playsinline=0&muted=1&autoplay=1&autopause=0&controls=0&loop=1&app_id=122963" className="h-screen w-full aspect-video absolute inset-0"></video> */}
        <video src="https://res.cloudinary.com/dfhg1joox/video/upload/v1699877866/yakshagavishti/achievementsvideo_e7ayx4.mp4" className="h-screen w-full absolute inset-0 object-cover -z-50" autoPlay muted controls={false} loop playsInline></video>
        <div className="bg-gradient-to-t from-black/50 to-black/50 h-screen w-full absolute inset-0 -z-20"></div>
        <div>
          <div className="font-rhomdon font-bold text-5xl sm:text-7xl md:text-8xl 2xl:text-9xl ">Achievements</div>
          <br />
          <p className="text-secondary-100 text-3xl font-body text-center">
            Remarkable Feats in the Spotlight
          </p>
        </div>
        <span className='animate-pulse fixed bottom-16 landscape:short:bottom-10 right-1/2 translate-x-1/2 -z-10'>
          <BiChevronsDown className='animate-arrow-down text-3xl'></BiChevronsDown>
        </span>
      </div>
      <section className="relative snap-start">
        <div className="flex flex-col items-center w-screen bg-gradient-to-br from-primary-100 to-[#100D27] px-4 sm:px-8 lg:px-32 snap-y snap-mandatory h-screen overflow-scroll no-scrollbar">
          <div className="w-full ">
            {achievements.map((ach, idx) => {
              if(idx % 2 === 0) {
                const row = [{contentId: idx,img: `https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/achievements/${idx+1}.jpg`}]

                const nextAchievement = achievements[idx + 1];
                nextAchievement && row.push({contentId: idx + 1, img: `https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/achievements/${idx+2}.jpg`})

                // const secNextAchievement = t.achievements[idx + 2]
                // secNextAchievement && row.push({...secNextAchievement, img: `/${idx+3}.jpg`})

                return (
                  <div key={idx} className="w-full relative flex flex-col sm:justify-center justify-start h-screen snap-start gap-10 items-center group/page">
                    <div className="xl:w-[1280px] w-full px-4 sm:px-8 lg:px-32 md:mb-16 mt-44 sm:mt-0">
                      <Expandable key={idx} cards={row} setContentId={setContentId} direction={idx % 4 == 0 ? "" : "-"} />
                    </div>
                    <div className="h-48 sm:h-fit md:h-48  flex-col justify-center items-center gap-4 md:gap-3 absolute bottom-9 sm:bottom-5 md:bottom-3 group-hover/page:flex hidden landscape:short:bottom-0 landscape:short:h-fit">
                      <div data-id={`${idx}`} className="flex justify-center text-lg sm:text-xl md:text-2xl text-center text-secondary-100">{achievements[contentId]?.title}</div>
                      <div className="flex flex-col justify-center items-center gap-2 md:gap-1">
                        {achievements[contentId]?.team && <div className="text-base md:text-lg xl:text-xl flex items-center gap-3">
                          <GiPaperArrow className="-rotate-45 text-secondary-100 select-none" />
                          <div className="">{achievements[contentId]?.team}</div>
                        </div>}
                        {achievements[contentId]?.individual.map((ind, i) => (
                          <div key={i} className="text-base md:text-lg xl:text-xl flex items-center gap-3">
                            <GiPaperArrow className="-rotate-45 text-secondary-100 select-none" />
                            <div className="">{ind}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Achievements