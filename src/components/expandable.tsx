import Image from "next/image";
import { JSX } from "react";

interface card {
  img: string
  content: string
}

const Expandable = ({cards}: {cards: card[]}) => {
  return (
    <div className="skew-x-3 flex justify-around gap-3 items-center h-96 m-10">
      {cards.map((card, idx) => {
        return (
          <div className="relative group h-96 flex-1 hover:flex-[8] transition-all duration-1000 ease-in-out flex items-end justify-center bg-gradient-to-t from-black to-transparent" key={idx}>
            <Image src={card.img} fill className="object-cover grayscale group-hover:grayscale-0 object-center -z-10 rounded-xl transition-all duration-700 ease-in-out" alt="" />
            <p className="backdrop-blur-sm group-hover:opacity-[0.99] opacity-0 transition-all duration-700 ease-out">{card.content}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Expandable