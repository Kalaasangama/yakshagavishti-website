import React from "react";
import Card from "./Aboutcard";

const Mycomponent: React.FC = () => {
  const cardProps = [
    {
      name: "Jane Doe",
      title: "Photographer & Art",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      imageUrl:
        "https://images.unsplash.com/photo-1562583489-bf23ec64651d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "John Smith",
      title: "Web Developer",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      imageUrl:
        "7.jpg",
    },
    {
      name: "John Smith",
      title: "Web Developer",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      imageUrl:
        "7.jpg",
    },
    {
      name: "John Smith",
      title: "Web Developer",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      imageUrl:
        "1.png",
    },
  ];

  return (
    <div className="flex my-8 items-center justify-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cardProps.map((cardProp) => (
          <Card key={cardProp.name} {...cardProp} />
        ))}
      </div>
    </div>
  );
};

export default Mycomponent;
