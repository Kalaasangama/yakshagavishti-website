import React from "react";
import Card from "./Corecard";

const AllCards: React.FC = () => {
  const cardProps = [
    
    
    {
      name: "Aniruddha Upadhya K",
      role: "Web Developer",
      linkedinURL: "https://www.linkedin.com/in/aniruddha-upadhya-k-324288246",
      githubURL: "https://github.com/Aniruddha-Upadhya-K",
      instagramURL: "",
      imageSrc: "/Cloudinary/team/1.jpg",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    },
    {
      name: "Satwik R Prabhu",
      role: "Web Developer",
      linkedinURL: "https://www.linkedin.com/in/satwikprabhu/",
      githubURL: "https://github.com/satwikrprabhu",
      instagramURL: "https://youtu.be/PYNeVjzT0P4?si=WIsCrm4tqyZhUoax",
      imageSrc: "/Cloudinary/team/22.jpg",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    },
    {
      name: "Srivatsa R Upadhya",
      role: "Web Developer",
      linkedinURL: "https://www.linkedin.com/johnsmith",
      githubURL: "https://github.com/johnsmith",
      instagramURL: "",
      imageSrc: "/Cloudinary/team/3.jpg",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    },
    {
      name: "Swasthik Shetty",
      role: "Technical Head",
      linkedinURL: "https://www.linkedin.com/in/swasthikshetty10",
      githubURL: "https://github.com/swasthikshetty10",
      instagramURL: "",
      imageSrc:
        "/Cloudinary/team/4.jpg",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    },
    {
      name: "Taksheel Shetty",
      role: "Web Developer",
      linkedinURL: "https://www.linkedin.com/in/taksheel-shetty-696047229",
      githubURL: "https://github.com/Taksheelshetty",
      instagramURL: "",
      imageSrc:
        "/Cloudinary/team/5.jpg",
      description: "",
    },
    {
      name: "Adithya Rao K",
      role: "Web Developer",
      linkedinURL: "https://www.linkedin.com/in/adithya-rao-k-537394229/",
      githubURL: "https://github.com/Adithya11811",
      instagramURL: "",
      imageSrc:
        "/Cloudinary/team/6.jpg",
      description: "",
    },
    {
      name: "Kshitij Shetty ",
      role: "Web Developer",
      linkedinURL: "https://linkedin.com/in/kshitij%20shetty",
      githubURL: "https://github.com/kshitijshettyyy",
      instagramURL: "",
      imageSrc:
        "/Cloudinary/team/7.jpg",
      description: "",
    },
    {
      name: "Abhijith Hegde ",
      role: "Web Developer",
      linkedinURL: "https://www.linkedin.com/in/abhijithhegde",
      githubURL: "https://github.com/abhijithhegde",
      instagramURL: "",
      imageSrc:
        "/Cloudinary/team/8.jpg",
      description: "",
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
