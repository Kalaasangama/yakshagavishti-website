import React from "react";
import Card from "./Aboutcard";

const members = [
  {
    name: "Amrutha V",
    role: "President",
  },
  {
    name: "Krishna M S",
    role: "Secretary",
  },
  {
    name: "Anwesh R Shetty",
    role: "Treasurer and Yakshagana Head",
  },
  {
    name: "Shrikrishna",
    role: "Vice President",
  },
  {
    name: "Keshav Nayak",
    role: "Joint Secretary",
  },
  {
    name: "Sinchana S Bairy",
    role: "Classical Dance Head",
  },
  {
    name: "Shravya",
    role: "Classical Dance Head",
  },
  {
    name: "Shreyas Upadhyaya",
    role: "Classical music Head",
  },
  {
    name: "Mahatee",
    role: "Classical music Head",
  },
  {
    name: "Eshaan Rao",
    role: "Bhajan Head",
  },
  {
    name: "Shreya P V",
    role: "Bhajan Head",
  },
  {
    name: "Varun",
    role: "Yakshagana Head",
  },
  {
    name: "Sanjana Jain",
    role: "Folk Head",
  },
  {
    name: "Mayur M Shet",
    role: "Social media and folk Head",
  },
  {
    name: "Vaibhav",
    role: "Executive Member",
  },
  {
    name: "T M Shravan Acharya",
    role: "Executive Member",
  },
  {
    name: "Manish",
    role: "Executive Member",
  },
  {
    name: "Kishan",
    role: "Executive Member",
  },
]

const AboutCardsSection: React.FC = () => {
  return (
    <div className="flex my-8 items-center justify-center">
      <div className="flex flex-wrap gap-10 justify-center">
        {members.map((member, idx) => (
          <Card key={idx} {...member} url={`/Cloudinary/about/members/${member.name}.jpg`} />
        ))}
      </div>
    </div>
  );
};

export default AboutCardsSection;
