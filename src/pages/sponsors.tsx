import React from 'react'
import HorizontalScroll from '~/components/horizontalScroll';
import type { CarouselCardT } from '~/components/carouselCard';

const Sponsors = () => {
  return (
    <div className="">
      <div className="fixed top-0 left-0 right-0 bottom-0 -z-50">
        {/* Video */}
      </div>
      <div className="left-0 h-screen mx-4 sm:mx-8 lg:mx-32 flex flex-col justify-center items-center">
        <div className="flex h-40 items-center justify-center">
          <h1 className="font-hindi font-bold text-5xl sm:text-7xl md:text-6xl 2xl:text-7xl text-center">Sponsors</h1>
        </div>
        <p className='text-xs sm:text-sm md:text-base xl:text-lg text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
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
  { url: "/2.jpg", title: "Sponsor 1", link:"", about: "about 1" },
  { url: "/1.jpg", title: "Sponsor 2", link:"", about: "about 2" },
  { url: "/3.jpg", title: "Sponsor 3", link:"", about: "about 3" },
  { url: "/4.jpg", title: "Sponsor 4", link:"", about: "about 4" },
  { url: "/1.jpg", title: "Sponsor 5", link:"", about: "about 5" },
  { url: "/2.jpg", title: "Sponsor 6", link:"", about: "about 6" },
  { url: "/3.jpg", title: "Sponsor 7", link:"", about: "about 7" },
  { url: "/4.jpg", title: "Sponsor 8", link:"", about: "about 8" },
  { url: "/1.jpg", title: "Sponsor 9", link:"", about: "about 9" },
  { url: "/2.jpg", title: "Sponsor 10", link:"", about: "about 10" },
];