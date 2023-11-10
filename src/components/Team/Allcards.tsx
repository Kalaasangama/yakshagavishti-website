import React from "react";
import Card from "./Corecard";

const AllCards: React.FC = () => {
  const cardProps = [
    {
      name: "Jane Doe",
      role: "Photographer & Artist",
      linkedinURL: "https://www.linkedin.com/janedoe",
      githubURL: "https://github.com/janedoe",
      instagramURL: "https://www.instagram.com/janedoe",
      imageSrc:
        "/1.png",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    },
    {
      name: "John Smith",
      role: "Web Developer",
      linkedinURL: "https://www.linkedin.com/johnsmith",
      githubURL: "https://github.com/johnsmith",
      instagramURL: "https://www.instagram.com/johnsmith",
      imageSrc: "",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    },
    {
      name: "Alice Johnson",
      role: "Graphic Designer",
      linkedinURL: "https://www.linkedin.com/alicejohnson",
      githubURL: "https://github.com/alicejohnson",
      instagramURL: "https://www.instagram.com/alicejohnson",
      imageSrc: "",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    },
  ];

  return (
    <div className="flex my-8 items-center justify-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cardProps.map((cardProp, idx) => (
          <Card key={idx} {...cardProp} />
        ))}
      </div>
    </div>
  );
};

export default AllCards;
