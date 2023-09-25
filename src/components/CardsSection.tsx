import React from "react";
import Card from "./Aboutcard";

interface CardProps {
  title: string;
  copy: string;
  image: string;
}

const cards: ReadonlyArray<CardProps> = [
  {
    title: "Mountain View",
    copy: "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
    image: "/7.jpg",
  },
  {
    title: "Mountain View",
    copy: "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
    image: "/7.jpg",
  },
  {
    title: "Mountain View",
    copy: "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
    image: "/7.jpg",
  },
  {
    title: "Mountain View",
    copy: "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
    image: "/7.jpg",
  },
  {
    title: "Mountain View",
    copy: "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
    image: "/7.jpg",
  },
];

const AllCards: React.FC = () => {
  return (
    <div className="relative">
      <div className="grid gap-4 p-2 md:grid-cols-3">
        {cards.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            copy={card.copy}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
};

export default AllCards;
