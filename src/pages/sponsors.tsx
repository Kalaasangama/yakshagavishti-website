import React from 'react'
import HorizontalScroll from '~/components/Sponsors/horizontalScroll';
import type { CarouselCardT } from '~/components/Sponsors/carouselCard';
import Reveal from '~/components/Animations/reveal';
import { useRouter } from 'next/router';
import en from '~/locale/en/sponsors';
import kn from '~/locale/kn/sponsors';

const Sponsors = () => {
  const router = useRouter()
  const t = router.locale === "en" ? en : kn

  return (
    <div className="">
      <div className="fixed top-0 left-0 right-0 bottom-0 -z-50">
        {/* Video */}
      </div>
      <div className="left-0 h-screen mx-4 sm:mx-8 lg:mx-32 flex flex-col justify-center items-center gap-3">
        <Reveal classes="flex h-40 items-center justify-center">
          <h1 className="font-hindi font-bold text-5xl sm:text-7xl md:text-8xl 2xl:text-9xl text-center">{t.title}</h1>
        </Reveal>
        <Reveal classes=''>
          <p className='text-base sm:text-lg md:text-xl 2xl:text-4xl px-5 text-center'>{t.subTitle}</p>
        </Reveal>
      </div>
      <HorizontalScroll cardsInfo={...t.sponsors} />
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold text-sm sm:text-base md:text-lg xl:text-xl text-center">{t.navigation}</span>
      </div>
    </div>
  );
};

export default Sponsors;