import { useRouter } from "next/router";
import Expandable from "~/components/expandable";
import en from "~/locale/en/achievements";
import kn from "~/locale/kn/achievements";

const Achievements = () => {
  const router = useRouter()
  const t = router.locale === "en" ? en : kn
  
  // const row = () => {
  //   for(let idx = 0; idx < t.achievements.length / 3; idx++) {

  //   }
  // }

  return (
    <section className="min-h-screen mx-4 sm:mx-8 lg:mx-32 flex flex-col gap-10">
      <div className="font-hindi text-xl sm:text-4xl md:text-4xl 2xl:text-5xl pt-24">{t.title}</div>
        {t.achievements.map((ach, idx) => {
          if(idx % 3 === 0) {
            const row = [{...ach, img: `/${idx+1}.jpg`}]

            const nextAchievement = t.achievements[idx + 1];
            nextAchievement && row.push({...nextAchievement, img: `/${idx+2}.jpg`})

            const secNextAchievement = t.achievements[idx + 2]
            secNextAchievement && row.push({...secNextAchievement, img: `/${idx+3}.jpg`})
            
            return (
              <Expandable cards={row} direction="" />
            )
          }

        })}
    </section>
  )
}

export default Achievements