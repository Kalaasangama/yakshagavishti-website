import ach_img from "../Images/y2.jpg";

import React from "react";
import Image, { StaticImageData } from "next/image";

function Achievement1({
  bg,
  hidden,
  head,
  text,
  achieveImg,
}: {
  bg: string;
  hidden: string|StaticImageData;
  head: string;
  text: string;
  achieveImg: string|StaticImageData;
}) {
  return (
    <main className="from-primary-100 via-primary-transparent-25 to-primary-100  relative flex h-screen   flex-col bg-gradient-to-t ">
      {/* Background image */}
      <Image
        src={bg}
        className={`absolute inset-0 h-full w-full object-cover opacity-50 `}
        alt="Error loading"
      />

      <div
        className={`${hidden} heading isolate pb-8 pt-10 text-center text-4xl text-white sm:text-6xl lg:mb-0 lg:mt-10 lg:pb-0 lg:pt-2`}
      >
        Achievements
      </div>

      <div className="main-div h isolate flex w-full flex-col  items-center lg:mt-0 lg:h-full lg:flex-row lg:justify-evenly">
        <div className="achieve-img h-auto lg:flex lg:w-1/2 lg:justify-center">
          {/* Team image */}
          {/* <Image
            src={ach_img}
            className="w-full sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl max rounded-lg border-white border-solid border-2"
            alt="Error loading"
          /> */}
          <Image
            className="mx-3 h-[320px] w-[320px] rounded-lg border-2 border-solid border-white sm:h-[450px] sm:w-[450px] lg:h-[550px] lg:w-[550px]  "
            src={achieveImg}
            alt="Error loading"
          ></Image>
          {/* //         </div> */}
        </div>

        {/* Achievement text */}
        <div className="achieve-text mt-7 w-full p-3 text-justify text-white sm:w-2/3 lg:w-2/5">
          <p className="mb-2 mt-3 text-center text-2xl sm:text-4xl lg:pb-6 lg:text-left lg:text-6xl">
            {head}
          </p>
          <p className="px-3 text-base sm:text-xl lg:text-lg">{text}</p>
        </div>
      </div>
    </main>
  );
}

export default Achievement1;
