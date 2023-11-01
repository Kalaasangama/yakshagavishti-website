import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

export type CarouselCardT = {
  title: string;
  link:string;
  about: string;
  url: string
};

interface Props {
  card: CarouselCardT
  contents: {
    title: string
    about: string,
    active: boolean,
    link: string
  } 
  setContents: Dispatch<SetStateAction<{
    title: string;
    about: string;
    active: boolean,
    link: string
  }>>
}

const CarouselCard = ({ card, contents, setContents }: Props) => {

  return (
    <div
      onMouseEnter={() => {
        setContents({
          title: card.title,
          about: card.about,
          active: true,
          link: card.link
        })
      }}
      onMouseLeave={() => {
        setContents({
          ...contents,
          active: false
        })
      }}
      className="group relative lg:h-[350px] lg:w-[350px] h-[250px] w-[250px] overflow-hidden rounded-2xl"
    >
      <Image src={card.url} fill className="object-cover object-center z-0 transition-transform duration-300 group-hover:scale-110" alt="" />
    </div>
  );
};

export default CarouselCard