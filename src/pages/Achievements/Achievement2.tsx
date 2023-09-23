import React from "react";
import Image from "next/image";
import backGround from "../Images/MAN_y6 (1).jpg";
import ach_img from "../Images/y4.jpg";
// import d from "../Images/vik.jpg";
function Achievement2({ bg,head,text,achieveImg }: { bg:string,head:string,text:string,achieveImg:string}) {
  return (
    <main className=" relative h-screen  bg-black flex items-center  ">
      {/* background image */}
      <Image
        src={bg}
        className="absolute h-full w-screen  opacity-30 sm:h-screen object-contain "
        alt="Error loading"
      ></Image>
      
      {/* <div className={`${hidden} dispal isolate heading text-white text-center pt-20 pb-8 text-4xl sm:text-6xl lg:mb-10 lg:pt-10`}>
        Achievements
      </div> */}
      <div className="main-div  isolate flex flex-col-reverse items-center my-auto lg:flex-row  w-ful lg:mt-0 mt-auto lg:h-full lg:justify-evenly">
       
        
        {/*Achievement text  */}
        <div className="achieve-text p-3 text-justify text-white mt-7 sm:w-2/3 lg:w-2/5">
          <p className="text-center text-2xl  sm:text-4xl mt-3 mb-2 lg:text-left lg:text-6xl lg:pb-6 ">{head}</p>
          <p className=" text-base sm:text-2xl px-3 lg:text-lg">
            {text}
          </p>
        </div>
        <div className="achieve-img  h-auto lg:w-1/2 lg:flex  lg:justify-center">
           
           {/*team image  */}
          <Image className="w-[320px] h-[320px] mx-3 sm:w-[450px] sm:h-[450px] lg:w-[550px] lg:h-[550px] rounded-lg border-white border-solid border-2  " src={achieveImg} alt="Error loading"></Image>
        </div>
      </div>
    </main>
  );
}

export default Achievement2;
