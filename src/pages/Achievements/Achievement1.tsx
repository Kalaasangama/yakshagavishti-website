import ach_img from "../Images/y2.jpg";

import React from "react";
import Image from "next/image";

function Achievement1({ bg,hidden,head,text,achieveImg }: { bg:string,hidden:string,head:string,text:string,achieveImg:string}) {
  return (
    <main className="relative h-screen  bg-black flex flex-col ">
      {/* Background image */}
      <Image
        src={bg}
        className={`absolute inset-0 w-full h-full opacity-50 object-contain `}
        alt="Error loading"
      />

      <div className={`${hidden} isolate heading text-white text-center pt-10 pb-8 text-4xl sm:text-6xl lg:mb-0 lg:mt-10 lg:pb-0 lg:pt-2`}>
        Achievements
      </div>
      
      <div className="main-div h isolate flex flex-col items-center  lg:flex-row w-full lg:mt-0 lg:justify-evenly lg:h-full">
        <div className="achieve-img h-auto lg:w-1/2 lg:flex lg:justify-center">
          {/* Team image */}
          {/* <Image
            src={ach_img}
            className="w-full sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl max rounded-lg border-white border-solid border-2"
            alt="Error loading"
          /> */}
           <Image className="w-[320px] h-[320px] mx-3 sm:w-[450px] sm:h-[450px] lg:w-[550px] lg:h-[550px] rounded-lg border-white border-solid border-2  " src={achieveImg} alt="Error loading"></Image>
{/* //         </div> */}
        </div>

        {/* Achievement text */}
        <div className="achieve-text p-3 text-justify text-white mt-7 w-full sm:w-2/3 lg:w-2/5">
          <p className="text-center text-2xl sm:text-4xl mt-3 mb-2 lg:text-left lg:text-6xl lg:pb-6">
            {head}
          </p>
          <p className="text-base sm:text-xl px-3 lg:text-lg">
            {text}
          </p>
        </div>
      </div>
    </main>
  );
}

export default Achievement1;
