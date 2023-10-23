import Image from "next/image";
import { JSX } from "react";

interface card {
  img: string
  content: string
}

const Expandable = ({cards, direction}: {cards: card[], direction:string}) => {
  return (
    <div style={{transform: `skew(${direction}3deg)`}} className={` flex justify-around gap-2 md:gap-3 items-center h-96 mx-1 sm:mx-0`}>
      {cards.map((card, idx) => {
        return (
          <div className="relative group h-96 flex-1 hover:flex-[10] flex-grow transition-all duration-1000 ease-in-out flex items-end justify-center bg-gradient-to-t from-black to-transparent" key={idx}>
            <Image src={card.img} fill className="object-cover grayscale group-hover:grayscale-0 object-center -z-10 rounded-xl transition-all duration-700 ease-in-out" alt="" />
            <p className="backdrop-blur-sm group-hover:opacity-[0.99] opacity-0 transition-all duration-700 ease-out">{card.content}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Expandable