import Image from "next/image";
import type { Dispatch } from "react";

interface card {
  img: string
  contentId: number
}

const Expandable = ({cards, direction, setContentId}: {cards: card[], direction:string, setContentId: Dispatch<number>}) => {
  return (
    <div style={{transform: `skew(${direction}3deg)`}} className={` flex justify-around gap-2 md:gap-3 items-center mx-1 sm:mx-0`}>
      {cards.map((card, idx) => {
        return (
          <div onMouseEnter={() => setContentId(card.contentId)} onMouseLeave={() => setContentId(-1)} className="relative group h-72 md:h-[45vh] sm:h-[45vh] flex-1 hover:flex-[10] flex-grow transition-all duration-1000 ease-in-out flex items-end justify-center" key={idx}>
            <Image src={card.img} fill className="object-cover grayscale group-hover:grayscale-0 object-center -z-10 rounded-xl transition-all duration-700 ease-in-out" alt="" />
          </div>
        )
      })}
    </div>
  )
}

export default Expandable