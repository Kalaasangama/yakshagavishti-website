import React from 'react'
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { useWindowSize } from '~/components/customHooks';

const Sponsors = () => {
  return (
    <div className="">
      <div className="h-screen mx-4 sm:mx-8 lg:mx-32">
        <div className="flex h-40 items-center justify-center">
          <h1 className="font-serif font-bold uppercase text-neutral-500 md:text-6xl sm:text-5xl text-4xl">Sponsors</h1>
        </div>
        <p className='flex items-center justify-center text-base text-neutral-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
      </div>
      <HorizontalScrollCarousel />
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">Scroll up</span>
      </div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const horScroll = useScroll({
      target: targetRef,
    });
    const growScroll = useScroll({
      target: targetRef,
      offset: ["start 101vh", "start start"]
    })

    const {width, height}: {width: number, height: number} = useWindowSize()
    const unit = (height > width)? "vh" : "vw"

    const grow = useTransform(growScroll.scrollYProgress, [0, 1], [`0${unit}`, `250${unit}`]) 
    const x = useTransform(horScroll.scrollYProgress, [0, 1], ["1%", "-100%"]);
  
    return (
      <section ref={targetRef} className="relative h-[300vh]">
        <motion.div style={{height: grow, width: grow}} className="fixed rounded-full top-full left-[50%] -translate-x-[50%] -translate-y-[50%] h-10 w-10 bg-gradient-to-r from-gray-700 via-gray-900 to-black -z-20"></motion.div>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden mx-4 sm:mx-8 lg:mx-32">
            <motion.div style={{ x }} className={`flex gap-8 pl-[100vw]`}>
              {cards.map((card) => {
                return <Card card={card} key={card.id} />;
              })}
            </motion.div>
        </div>
      </section>
    );
  };

  const Card = ({ card }: { card: CardType }) => {
  

    return (
      <div
        key={card.id}
        className="group relative lg:h-[350px] lg:w-[350px] h-[250px] w-[250px] overflow-hidden bg-neutral-200 rounded-2xl"
        onClick={event =>  window.location.href=card.link}
      >
        <div
          style={{
            backgroundImage: `url(${card.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
        ></div>
        <div className="absolute inset-0 z-10 grid place-content-end">
          <p className=" invisible group-hover:visible bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
            {card.title}
          </p>
        </div>
      </div>
    );
  };

export default Sponsors;

type CardType = {
    url: string;
    title: string;
    id: number;
    link:string
  };

const cards: CardType[] = [
  {
    url: "/2.jpg",
    title: "Sponsor 1",
    id: 1,
    link:"https://www.nike.com/in/",//the website of the sponsors in case user wants to visit
  },
  {
    url: "/1.jpg",
    title: "Sponsor 2",
    id: 2,
    link:"https://www.nike.com/in/",
  },
  {
    url: "/3.jpg",
    title: "Sponsor 3",
    id: 3,
    link:"https://www.nike.com/in/",
  },
  {
    url: "/4.jpg",
    title: "Sponsor 4",
    id: 4,
    link:"https://www.nike.com/in/",
  },
  {
    url: "/1.jpg",
    title: "Sponsor 5",
    id: 5,
    link:"https://www.nike.com/in/",
  },
  {
    url: "/2.jpg",
    title: "Sponsor 6",
    id: 6,
    link:"https://www.nike.com/in/",
  },
  {
    url: "/3.jpg",
    title: "Sponsor 7",
    id: 7,
    link:"https://www.nike.com/in/",
  },
  {
    url: "/4.jpg",
    title: "Sponsor 8",
    id: 8,
    link:"https://www.nike.com/in/",
  },
  {
    url: "/1.jpg",
    title: "Sponsor 9",
    id: 9,
    link:"https://www.nike.com/in/",
  },
  {
    url: "/2.jpg",
    title: "Sponsor 10",
    id: 10,
    link:"https://www.nike.com/in/",
  },
];