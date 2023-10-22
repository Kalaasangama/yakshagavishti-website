import React from "react";

interface CardProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ name, title, description, imageUrl }) => {
  return (
    <div className="group sm:h-96 h-80 my-2 sm:my-0 sm:w-80 w-64 [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0">
          <img
            className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
            src={imageUrl}
            alt=""
          />
        </div>
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex min-h-full flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-lg">{title}</p>
            <p className="text-base">{description}</p>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;