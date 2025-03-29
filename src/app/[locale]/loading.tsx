'use client';

import Image from "next/image";
import { useEffect } from "react";


const Loader = () => {
  useEffect(() => {
    //disable scroll
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      }
    }
  );
  
  return (
    <div className="fixed h-screen w-screen inset-0 flex justify-center items-center z-100 bg-gradient-to-t bg-primary-100 to-bg-gradient-100">
      <Image src={'/logo.png'} className="h-[45vh] w-[45vw] xl:h-[25vh] xl:w-[35%] object-contain object-center animate-breathe pointer-events-none" height={500} width={500} alt="Logo" />
    </div>
  );
}

export default Loader