import { useScroll, useTransform, motion, useAnimation, animationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useWindowSize, useContainerDimension } from "../customHooks";
import Reveal from "../Animations/reveal";
import CarouselCard from "./carouselCard";
import Link from "next/link";
import { useRouter } from "next/router";
import en from "~/locale/en/sponsors";
import kn from "~/locale/kn/sponsors";

type CardsInfoT = {
  title: string;
  link:string;
  about: string;
};

const HorizontalScroll = ({cardsInfo}: {cardsInfo: CardsInfoT[]}) => {
  const router = useRouter()
  const t = router.locale === "en" ? en : kn

  const targetRef = useRef<HTMLDivElement | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null)
  const container = useContainerDimension(containerRef)

  const [contents, setContents] = useState({title: "", about: "", active: false, link:""})
  const animationControl = useAnimation()

  useEffect(() => {
    if(contents.active)
      animationControl.start("visible")
    else
      animationControl.start("hidden")
  }, [contents])

  const horScroll = useScroll({
    target: targetRef,
  });
  const growScroll = useScroll({
    target: targetRef,
    offset: ["start 100vh", "start start"]
  })

  const {width, height}: {width: number, height: number} = useWindowSize()
  const unit = (height > width)? "vh" : "vw"

  const grow = useTransform(growScroll.scrollYProgress, [0, 1], [`0${unit}`, `250${unit}`]) 
  const x = useTransform(horScroll.scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (

    <section ref={targetRef} className="relative h-[300vh]">
      <motion.div style={{height: grow, width: grow}} className="fixed rounded-full top-full left-[50%] -translate-x-[50%] -translate-y-[50%] h-10 w-10 bg-gradient-to-r from-gray-700 from-10% via-gray-800 to-black to-80% -z-20 overflow-hidden">
        <div className="bg-gradient-to-tr from-bg-gradient-50 from-0% to-transparent to-80% h-full w-full"></div>
      </motion.div>

      <div ref={el => {containerRef.current = el}} className="sticky top-0 flex h-screen items-center  mx-4 sm:mx-8 lg:mx-32 overflow-hidden">

        <motion.div style={{ x: x, paddingLeft: `${container.width}px` }} className={`flex gap-8`}>
          <div style={{width: `${container.width}px`}} className={`absolute left-0 h-[250px] lg:h-[350px] flex flex-col justify-center items-center  text-xl sm:text-2xl md:text-3xl 2xl:text-5xl px-5 text-center overflow-hidden`}>

            <Reveal classes="font-tourney font-black"><p>{t.ourSponsors}</p></Reveal>

          </div>

          <div style={{width: `${container.width}px`}} className={`absolute left-full h-[250px] lg:h-[350px] flex flex-col justify-center items-center text-xl sm:text-2xl md:text-3xl 2xl:text-5xl`}>

            <Reveal classes="font-tourney font-black"><p>{t.endSponsors}</p></Reveal>

          </div>

          <div className="flex flix-col">
            <div className="flex gap-8 group/title">
              {cardsInfo.map((card, idx) => {
                if(width < 1024) 
                  return <CarouselCard card={{...card, url: `/${idx+1}.jpg`}} key={idx} contents={contents} setContents={setContents} />
                else
                  return (
                    <Link href={card.link}>
                      <CarouselCard card={{...card, url: `/${idx+1}.jpg`}} key={idx} contents={contents} setContents={setContents} />
                    </Link>
                  )
              })}
            </div>
          </div>

        </motion.div>
        <motion.div
          variants={{
            hidden: {opacity: 0, y:75, x:"0%"},
            visible: {opacity: 1, y: 0, x:"0%"}
          }}
          transition={{
            duration: 0.25,

          }}
          initial="hidden"
          animate={animationControl}
          className="absolute bottom-0 right-0 w-full gap-4 md:gap-5"
        >
          <div className="w-full font-hindi text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl text-center text-secondary-100">{contents.title}</div>
          <div className="text-xs sm:text-sm md:text-base xl:text-lg flex flex-col justify-center gap-1 mb-20 sm:mb-16 md:mb-12 lg:mb-10 text-center landscape:short:mb-1">
            <p className="">{contents.about}</p>
            <Link href={contents.link} className="text-secondary-100 underline underline-offset-2 font-semibold lg:hidden">Follow Up</Link></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScroll