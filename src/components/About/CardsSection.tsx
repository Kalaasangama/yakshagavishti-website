import React from "react";
import Card from "~/components/About/Aboutcard";

interface Member {
  name: string;
  role: string;
  [key: string]: string;
}

const members: Member[] = [
  {
    "name": "Spoorthi Bailoor",
    "role": "Folk Head"
  },
  {
    "name": "Sumith S Hegde",
    "role": "Bhajan Head"
  },
  {
    "name": "Shraddha Upadhyaya",
    "role": "Music Head"
  },
  {
    "name": "Manish R Rao",
    "role": "Core Member"
  },
  {
    "name": "Pratham P",
    "role": "Media Head"
  },
  {
    "name": "Shreya S Prabhu",
    "role": "Core Member"
  },
  {
    "name": "Amrutha R Rao",
    "role": "Core Member"
  },
  {
    "name": "Keshav Nayak",
    "role": "Joint Secretary"
  },
  {
    "name": "Shreya S Rao",
    "role": "Classical Music Head"
  },
  {
    "name": "Harish Vishwanath Bhat",
    "role": "Bhajan Co-Head"
  },
  {
    "name": "Shreya P V",
    "role": "Secretary and Treasurer"
  },
  {
    "name": "Srikrishna Rao K S",
    "role": "President"
  },
]

const AboutCardsSection: React.FC = () => {
  return (
    <div className="flex my-8 items-center justify-center">
      <div className="flex flex-wrap gap-10 justify-center">
        {members.map((member, idx) => (
          <Card key={idx} {...member} url={`https://res.cloudinary.com/dfhg1joox/image/upload/v1699890927/yakshagavishti/assets/about/members/${member.name.replaceAll(' ', '_')}.jpg`} />
        ))}
      </div>
    </div>
  );
};

export default AboutCardsSection;