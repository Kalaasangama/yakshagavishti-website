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
        "https://images.unsplash.com/photo-1562583489-bf23ec64651d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    },
    {
      name: "John Smith",
      role: "Web Developer",
      linkedinURL: "https://www.linkedin.com/johnsmith",
      githubURL: "https://github.com/johnsmith",
      instagramURL: "https://www.instagram.com/johnsmith",
      imageSrc: "https://example.com/johnsmith-image.jpg",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    },
    {
      name: "Alice Johnson",
      role: "Graphic Designer",
      linkedinURL: "https://www.linkedin.com/alicejohnson",
      githubURL: "https://github.com/alicejohnson",
      instagramURL: "https://www.instagram.com/alicejohnson",
      imageSrc: "https://example.com/alicejohnson-image.jpg",
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
