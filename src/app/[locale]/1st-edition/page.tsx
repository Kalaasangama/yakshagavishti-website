"use client";

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { useTranslations } from "next-intl";
import Image from "next/image";

const MovieNightSlider = () => {
  const t = useTranslations("1st-edition");
  const images = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dvueqtopm/image/upload/v1744303491/SPV02468_s87v5m.jpg",
      imgPosition: false,
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/dvueqtopm/image/upload/v1744303489/ABI07850_kk7sxe.jpg",
      imgPosition: true,
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/dvueqtopm/image/upload/v1744303492/ABI08040_mqqfau.jpg",
      imgPosition: false,
    },
    {
      id: 4,
      image:
        "https://res.cloudinary.com/dvueqtopm/image/upload/v1744303499/SPV02866_nzha1d.jpg",
      imgPosition: false,
    },
    {
      id: 5,
      image:
        "https://res.cloudinary.com/dvueqtopm/image/upload/v1744303500/SPV03414_h1mm2b.jpg",
      imgPosition: false,
    },
    {
      id: 6,
      image:
        "https://res.cloudinary.com/dvueqtopm/image/upload/v1744303497/SPV02825_vue6c2.jpg",
      imgPosition: false,
    },
    {
      id: 7,
      image:
        "https://res.cloudinary.com/dvueqtopm/image/upload/v1744303491/ABI08021_uicgcc.jpg",
      imgPosition: true,
    },
    {
      id: 8,
      image:
        "https://res.cloudinary.com/dvueqtopm/image/upload/v1744303494/SPV02820_pisz3k.jpg",
      imgPosition: false,
    },
  ];

  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (swiperRef.current) swiperRef.current.swiper.slideNext();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
      <div className="z-10 mt-12 flex w-full max-w-4xl flex-col items-center justify-center gap-8 rounded-2xl p-4 shadow-[0_0.5px_0_1px_rgba(255,255,255,0.23)_inset,0_1px_0_0_rgba(255,255,255,0.66)_inset,0_4px_16px_rgba(0,0,0,0.12)] md:flex-row">
        <div className="m-8 flex max-w-md flex-col items-center justify-center p-2 text-justify">
          <p className="mb-5 font-rhomdon text-sm font-thin text-white sm:text-base">
            {t("Description1")}
          </p>
          <p className="mb-5 font-rhomdon text-sm font-thin text-white sm:text-base">
            {t("Description2")}
          </p>
        </div>

        <div className="flex h-[400px] w-full justify-center px-0 py-0 sm:h-[450px] sm:w-64">
          <Swiper
            ref={swiperRef}
            effect={"cards"}
            grabCursor={true}
            initialSlide={2}
            speed={500}
            loop={true}
            mousewheel={{
              invert: false,
            }}
            modules={[EffectCards]}
            className="h-[350px] w-48 sm:h-[450px] sm:w-64"
          >
            {images.map((image) => (
              <SwiperSlide
                key={image.id}
                className="relative rounded-lg shadow-lg"
              >
                <div className="absolute inset-0 h-full w-full">
                  <Image
                    fill
                    src={image.image}
                    alt={`Slide ${image.id}`}
                    className="object-cover"
                    style={
                      image.imgPosition ? { objectPosition: "50% 0%" } : {}
                    }
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <ul className="absolute left-0 top-0 h-full w-full overflow-hidden">
        {Array.from({ length: 10 }).map((_, index) => (
          <li
            key={index}
            className="animate-circles absolute bottom-[-150px] block list-none bg-[#ff3cac] bg-gradient-to-br from-[#ff3cac] via-[#784ba0] to-[#2b86c5]"
            style={{
              left: `${index === 0 ? "25%" : index === 1 ? "10%" : index === 2 ? "70%" : index === 3 ? "40%" : index === 4 ? "65%" : index === 5 ? "75%" : index === 6 ? "35%" : index === 7 ? "50%" : index === 8 ? "20%" : "85%"}`,
              width: `${index === 0 ? "80px" : index === 1 ? "20px" : index === 2 ? "20px" : index === 3 ? "60px" : index === 4 ? "20px" : index === 5 ? "110px" : index === 6 ? "150px" : index === 7 ? "25px" : index === 8 ? "15px" : "150px"}`,
              height: `${index === 0 ? "80px" : index === 1 ? "20px" : index === 2 ? "20px" : index === 3 ? "60px" : index === 4 ? "20px" : index === 5 ? "110px" : index === 6 ? "150px" : index === 7 ? "25px" : index === 8 ? "15px" : "150px"}`,
              animationDelay: `${index === 0 ? "0s" : index === 1 ? "2s" : index === 2 ? "4s" : index === 3 ? "0s" : index === 4 ? "0s" : index === 5 ? "3s" : index === 6 ? "7s" : index === 7 ? "15s" : index === 8 ? "2s" : "0s"}`,
              animationDuration: `${index === 1 ? "12s" : index === 3 ? "18s" : index === 7 ? "45s" : index === 8 ? "35s" : index === 9 ? "11s" : "25s"}`,
            }}
          />
        ))}
      </ul>

      <style jsx>{`
        @keyframes gelatine {
          0%,
          100% {
            transform: scale(1, 1);
          }
          25% {
            transform: scale(0.9, 1.1);
          }
          50% {
            transform: scale(1.1, 0.9);
          }
          75% {
            transform: scale(0.95, 1.05);
          }
        }

        @keyframes circles {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 0;
          }
          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
          }
        }

        .animate-gelatine {
          animation: gelatine 0.5s 1;
        }

        .animate-circles {
          animation: circles 25s linear infinite;
        }

        @media (max-width: 768px) {
          .animate-circles {
            animation-duration: 15s;
          }
        }
      `}</style>
    </section>
  );
};

export default MovieNightSlider;
