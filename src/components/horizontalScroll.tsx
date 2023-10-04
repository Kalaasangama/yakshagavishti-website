import { useScroll, useTransform, motion, useAnimation, animationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useWindowSize, useContainerDimension } from "./customHooks";
import Reveal from "./reveal";
import CarouselCard from "./carouselCard";
import { CarouselCardT } from "./carouselCard";

const HorizontalScroll = ({cards}: {cards: CarouselCardT[]}) => {
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
      <motion.div style={{height: grow, width: grow}} className="fixed rounded-full top-full left-[50%] -translate-x-[50%] -translate-y-[50%] h-10 w-10 bg-gradient-to-r from-gray-700 via-gray-900 to-black -z-20"></motion.div>

      <div ref={el => {containerRef.current = el}} className="sticky top-0 flex h-screen items-center overflow-hidden mx-4 sm:mx-8 lg:mx-32">

        <motion.div style={{ x: x, paddingLeft: `${container.width}px` }} className={`flex gap-8`}>
          <div style={{width: `${container.width}px`}} className={`absolute left-0 h-[250px] lg:h-[350px] flex flex-col justify-center items-center text-base sm:text-lg md:text-xl 2xl:text-4xl`}>

            <Reveal classes=""><p>Our Sponsors</p></Reveal>

          </div>

          <div style={{width: `${container.width}px`}} className={`absolute left-full h-[250px] lg:h-[350px] flex flex-col justify-center items-center`}>

            <Reveal classes=""><p>End of Sponsors</p></Reveal>

          </div>

          <div className="flex flix-col">
            <div className="flex gap-8 group/title">
              {cards.map((card, idx) => {
                return <CarouselCard card={card} key={idx} contents={contents} setContents={setContents} />;
              })}
            </div>
          </div>

        </motion.div>
        <motion.div
          variants={{
            hidden: {opacity: 0, y:75},
            visible: {opacity: 1, y: 0}
          }}
          transition={{
            duration: 0.25,

          }}
          initial="hidden"
          animate={animationControl}
          className="fixed bottom-0 right-0 left-0"
        >
          <div className="text-xl sm:text-4xl md:text-4xl 2xl:text-5xl text-center">{contents.title}</div>
          <div className="text-xs sm:text-sm md:text-base xl:text-lg text-center">{contents.about}</div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScroll