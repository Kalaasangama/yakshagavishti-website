import React from 'react'
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const Sponsors = () => {
  return (
    <div className="bg-primary-100">
        <div className="flex h-40 items-center justify-center">
            <h1 className="font-serif font-bold uppercase text-neutral-500 md:text-6xl sm:text-5xl text-4xl">
            Sponsors
            </h1><br />
      </div>
      <p className='flex items-center justify-center text-base text-neutral-500 px-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
      <HorizontalScrollCarousel />
      <div className="flex h-48 items-center justify-center sm:mx-8 lg:mx-32">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div>
    </div>
  );
};
const HorizontalScrollCarousel = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
    });
  
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-63%"]);
  
    return (
      <section ref={targetRef} 
      className="relative h-[300vh] lg:px-20 px-0"
      // bg-gray-900 bg-opacity-75 
      style={{
        backgroundImage: `url(${"/gradient.png"})`, 
        // backgroundImage:`url(${"https://i.pinimg.com/originals/76/f0/bb/76f0bbaee282cc0042cd53a4c047532f.jpg"})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundBlendMode:'darken',
        }}
        >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8">
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
        className="group relative lg:h-[350px] lg:w-[350px] h-[250px] w-[250px] overflow-hidden bg-neutral-200 rounded-2xl "
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