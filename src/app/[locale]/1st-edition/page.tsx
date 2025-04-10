"use client"

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { useTranslations } from 'next-intl';

const MovieNightSlider = () => {

  const t = useTranslations("1st-edition");
  const images = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dvueqtopm/image/upload/v1744303491/SPV02468_s87v5m.jpg",
      imgPosition: false
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dvueqtopm/image/upload/v1744303489/ABI07850_kk7sxe.jpg",
      imgPosition: true
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dvueqtopm/image/upload/v1744303492/ABI08040_mqqfau.jpg",
      imgPosition: false
    },
    {
      id: 4,
      image: "https://res.cloudinary.com/dvueqtopm/image/upload/v1744303499/SPV02866_nzha1d.jpg",
      imgPosition: false
    },
    {
      id: 5,
      image: "https://res.cloudinary.com/dvueqtopm/image/upload/v1744303500/SPV03414_h1mm2b.jpg",
      imgPosition: false
    },
    {
      id: 6,
      image: "https://res.cloudinary.com/dvueqtopm/image/upload/v1744303497/SPV02825_vue6c2.jpg",
      imgPosition: false
    },
    {
      id: 7,
      image: "https://res.cloudinary.com/dvueqtopm/image/upload/v1744303491/ABI08021_uicgcc.jpg",
      imgPosition: true
    },
    {
      id: 8,
      image: "https://res.cloudinary.com/dvueqtopm/image/upload/v1744303494/SPV02820_pisz3k.jpg",
      imgPosition: false
    },
  ];

  return (
    <section className="relative flex justify-center items-center min-h-screen overflow-hidden px-4 py-8">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 rounded-2xl w-full max-w-4xl shadow-[0_0.5px_0_1px_rgba(255,255,255,0.23)_inset,0_1px_0_0_rgba(255,255,255,0.66)_inset,0_4px_16px_rgba(0,0,0,0.12)] z-10 p-4 mt-12">
        <div className="flex flex-col justify-center items-center max-w-md p-2 m-8 text-justify">
          <p className="text-white font-medium text-sm sm:text-base mb-5 font-rhomdon">
             {t("Description")}       
           </p>
        </div>
        
        <div className="w-full sm:w-64 h-[400px] sm:h-[450px] py-0  px-0 flex justify-center">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            initialSlide={2}
            speed={500}
            loop={true}
            mousewheel={{
              invert: false
            }}
            modules={[EffectCards]}
            className="w-48 sm:w-64 h-[350px] sm:h-[450px]"
          >
            {images.map((image) => (
              <SwiperSlide key={image.id} className="relative shadow-lg rounded-lg">
                <img 
                  src={image.image}
                  className={`absolute inset-0 w-full h-full object-cover ${image.imgPosition ? 'object-[50%_0%]' : ''}`}
                  alt={`Slide ${image.id}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <ul className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(10)].map((_, index) => (
          <li 
            key={index} 
            className="absolute block list-none bg-[#ff3cac] bg-gradient-to-br from-[#ff3cac] via-[#784ba0] to-[#2b86c5] animate-circles bottom-[-150px]"
            style={{
              left: `${index === 0 ? '25%' : index === 1 ? '10%' : index === 2 ? '70%' : index === 3 ? '40%' : index === 4 ? '65%' : index === 5 ? '75%' : index === 6 ? '35%' : index === 7 ? '50%' : index === 8 ? '20%' : '85%'}`,
              width: `${index === 0 ? '80px' : index === 1 ? '20px' : index === 2 ? '20px' : index === 3 ? '60px' : index === 4 ? '20px' : index === 5 ? '110px' : index === 6 ? '150px' : index === 7 ? '25px' : index === 8 ? '15px' : '150px'}`,
              height: `${index === 0 ? '80px' : index === 1 ? '20px' : index === 2 ? '20px' : index === 3 ? '60px' : index === 4 ? '20px' : index === 5 ? '110px' : index === 6 ? '150px' : index === 7 ? '25px' : index === 8 ? '15px' : '150px'}`,
              animationDelay: `${index === 0 ? '0s' : index === 1 ? '2s' : index === 2 ? '4s' : index === 3 ? '0s' : index === 4 ? '0s' : index === 5 ? '3s' : index === 6 ? '7s' : index === 7 ? '15s' : index === 8 ? '2s' : '0s'}`,
              animationDuration: `${index === 1 ? '12s' : index === 3 ? '18s' : index === 7 ? '45s' : index === 8 ? '35s' : index === 9 ? '11s' : '25s'}`
            }}
          />
        ))}
      </ul>

      <style jsx>{`
        @keyframes gelatine {
          0%, 100% { transform: scale(1, 1); }
          25% { transform: scale(0.9, 1.1); }
          50% { transform: scale(1.1, 0.9); }
          75% { transform: scale(0.95, 1.05); }
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