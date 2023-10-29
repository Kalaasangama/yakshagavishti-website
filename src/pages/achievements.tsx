import { useRouter } from "next/router";
import Expandable from "~/components/expandable";
import en from "~/locale/en/achievements";
import kn from "~/locale/kn/achievements";

const Achievements = () => {
  const router = useRouter()
  const t = router.locale === "en" ? en : kn

  return (
    <main className="snap-y snap-proximity">
      <div className="absolute inset-0 bg-black flex items-center justify-center snap-start">
        {/* video */}
        <div className="font-hindi font-bold text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl">{t.title}</div>
      </div>
      <section className="min-h-screen mt-[100vh] pt-14 mx-4 sm:mx-8 lg:mx-32 pb-10 snap-start">
        <div className="flex flex-col gap-10">
          {t.achievements.map((ach, idx) => {
            if(idx % 2 === 0) {
              const row = [{...ach, img: `/ach${idx+1}.png`}]

              const nextAchievement = t.achievements[idx + 1];
              nextAchievement && row.push({...nextAchievement, img: `/ach${idx+2}.png`})

              // const secNextAchievement = t.achievements[idx + 2]
              // secNextAchievement && row.push({...secNextAchievement, img: `/${idx+3}.jpg`})
              
              return (
                <Expandable key={idx} cards={row} direction={idx % 4 == 0? "" : "-"} />
              )
            }
          })}
        </div>
      </section>
    </main>
  )
}

export default Achievements