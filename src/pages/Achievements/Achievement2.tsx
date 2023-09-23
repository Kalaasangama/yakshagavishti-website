import React from "react";
import Image, { StaticImageData } from "next/image";
import backGround from "../Images/MAN_y6 (1).jpg";
import ach_img from "../Images/y4.jpg";
// import d from "../Images/vik.jpg";
function Achievement2({
  bg,
  head,
  text,
  achieveImg,
}: {
  bg: string|StaticImageData;
  head: string;
  text: string;
  achieveImg: string|StaticImageData;
}) {
  return (
    <main className=" relative flex  h-screen items-center bg-black  ">
      {/* background image */}
      <Image
        src={bg}
        className="absolute h-full w-screen  object-contain opacity-30 sm:h-screen "
        alt="Error loading"
      ></Image>

      {/* <div className={`${hidden} dispal isolate heading text-white text-center pt-20 pb-8 text-4xl sm:text-6xl lg:mb-10 lg:pt-10`}>
        Achievements
      </div> */}
      <div className="main-div  w-ful isolate my-auto mt-auto flex flex-col-reverse  items-center lg:mt-0 lg:h-full lg:flex-row lg:justify-evenly">
        {/*Achievement text  */}
        <div className="achieve-text mt-7 p-3 text-justify text-white sm:w-2/3 lg:w-2/5">
          <p className="mb-2 mt-3  text-center text-2xl sm:text-4xl lg:pb-6 lg:text-left lg:text-6xl ">
            {head}
          </p>
          <p className=" px-3 text-base sm:text-2xl lg:text-lg">{text}</p>
        </div>
        <div className="achieve-img  h-auto lg:flex lg:w-1/2  lg:justify-center">
          {/*team image  */}
          <Image
            className="mx-3 h-[320px] w-[320px] rounded-lg border-2 border-solid border-white sm:h-[450px] sm:w-[450px] lg:h-[550px] lg:w-[550px]  "
            src={achieveImg}
            alt="Error loading"
          ></Image>
        </div>
      </div>
    </main>
  );
}

export default Achievement2;
