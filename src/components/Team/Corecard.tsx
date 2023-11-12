import Image from "next/image";
import React from "react";
import { AiFillLinkedin, AiFillGithub, AiFillInstagram } from 'react-icons/ai'

interface CardProps {
  name: string;
  role: string;
  linkedinURL: string;
  githubURL: string;
  instagramURL: string;
  description: string;
}

const Card: React.FC<CardProps> = ({
  name,
  role,
  linkedinURL,
  githubURL,
  description,
}) => {
  return (
    <div className="w-full max-w-sm rounded-md bg-black/20 bg-opacity-30 p-5 text-center transition-transform hover:scale-105">
      <div className="h-72">
        <Image
          alt={name}
          src={`Cloudinary/team/${name}.jpg`}
          width="250"
          height="250"
          decoding="async"
          data-nimg="1"
          className="h-full w-full rounded-md object-cover"
          loading="lazy"
          style={{ color: "transparent" }}
        />
      </div>
      <div className="mt-5 flex flex-col">
        <h1 className="titleFont text-2xl font-bold text-white">{name}</h1>
        <p className="text-md bodyFont text-gray-200">{role}</p>
      </div>
      <div className="mt-2 flex justify-center gap-2">
        <a href={linkedinURL} target="_blank" rel="noreferrer">
          <AiFillLinkedin className="transition duration-150 ease-linear hover:text-secondary-200 text-2xl md:text-3xl"></AiFillLinkedin>
        </a>
        <a href={githubURL} target="_blank" rel="noreferrer">
          <AiFillGithub className="transition duration-150 ease-linear hover:text-secondary-200 text-2xl md:text-3xl"></AiFillGithub>
        </a>
        {/* <a href={instagramURL} target="_blank" rel="noreferrer">
          <AiFillInstagram className="transition duration-150 ease-linear hover:text-secondary-200 text-2xl md:text-3xl"></AiFillInstagram>
        </a> */}
      </div>
    </div>
  );
};

export default Card;
