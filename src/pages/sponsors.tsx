import React from 'react'
import HorizontalScroll from '~/components/Sponsors/horizontalScroll';
import type { CarouselCardT } from '~/components/Sponsors/carouselCard';
import Reveal from '~/components/Animations/reveal';

const Sponsors = () => {
  return (
    <div className="">
      <div className="fixed top-0 left-0 right-0 bottom-0 -z-50">
        {/* Video */}
      </div>
      <div className="left-0 h-screen mx-4 sm:mx-8 lg:mx-32 flex flex-col justify-center items-center gap-3">
        <Reveal classes="flex h-40 items-center justify-center">
          <h1 className="font-hindi font-bold text-5xl sm:text-7xl md:text-8xl 2xl:text-9xl text-center">Kalasangama</h1>
        </Reveal>
        <Reveal classes=''>
          <p className='text-base sm:text-lg md:text-xl 2xl:text-4xl px-5 text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </Reveal>
      </div>
      <HorizontalScroll cards={cards} />
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold text-sm sm:text-base md:text-lg xl:text-xl text-center">Scroll up</span>
      </div>
    </div>
  );
};

export default Sponsors;

const cards: CarouselCardT[] = [
  { url: "/2.jpg", title: "google", link:"https://www.google.com", about: "It's Google here!!! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, temporibus?" },
  { url: "/1.jpg", title: "lorem", link:"", about: "assumenda dolorum magnam fuga optio, praesentium facere neque perferendis, quae rem suscipit libero!" },
  { url: "/3.jpg", title: "ipsum", link:"", about: "Iure repudiandae et doloribus libero, quam molestiae laborum dignissimos delectus blanditiis quisquam " },
  { url: "/4.jpg", title: "dolor", link:"", about: "maiores facere. Voluptatum autem repudiandae quod, quas provident et quos ad?" },
  { url: "/1.jpg", title: "Sponsor 5", link:"", about: "about 5" },
  { url: "/2.jpg", title: "Sponsor 6", link:"", about: "about 6" },
  { url: "/3.jpg", title: "Sponsor 7", link:"", about: "about 7" },
  { url: "/4.jpg", title: "Sponsor 8", link:"", about: "about 8" },
  { url: "/1.jpg", title: "Sponsor 9", link:"", about: "about 9" },
  { url: "/2.jpg", title: "Sponsor 10", link:"", about: "about 10" },
];