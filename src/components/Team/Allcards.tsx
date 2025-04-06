import React from "react";
import Card from "~/components/Team/Corecard";

const AllCards: React.FC = () => {
  const cardProps = [
    {
      name: "Satwik R Prabhu",
      role: "Web Developer",
      linkedinURL: "https://www.linkedin.com/in/satwikprabhu/",
      githubURL: "https://github.com/satwikrprabhu",
      instagramURL: "https://youtu.be/PYNeVjzT0P4?si=WIsCrm4tqyZhUoax",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      url:"https://res.cloudinary.com/dvueqtopm/image/upload/v1743224895/Satwik_R_Prabhu_s1rok3.jpg",
    },
    {
      name:"Samarth H Shetty",
      role:"Web Developer",
      linkedinURL:"https://linkedin.com/in/samarth-shetty-a53018247/",
      githubURL:"https://github.com/Sammonster495",
      url:"https://res.cloudinary.com/dvueqtopm/image/upload/v1743224895/Samarth_H_Shetty_gyvsrx.webp",
    },
    {
      name:"Ishan Shetty",
      role:"Web Developer",
      linkedinURL:"https://www.linkedin.com/in/ishan-shetty-0a889821a/",
      githubURL:"https://github.com/Ishan-Shetty",
      url:"https://res.cloudinary.com/dvueqtopm/image/upload/v1743224899/Ishan_Shetty_urcr9o.jpg",
    }
   
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
