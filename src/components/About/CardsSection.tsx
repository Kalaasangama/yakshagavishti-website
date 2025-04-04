import React from "react";
import Card from "~/components/About/Aboutcard";

interface Member {
  name: string;
  role: string;
  [key: string]: string;
}

const members: Member[] = [
  {
    name: "Mr. Anant Murthi",
    "role": "Faculty Coordinator",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    name: "Mr. Shyam Sundar",
    "role": "Faculty Coordinator",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    name: "Shravan Udupa K",
    "role": "Kalaasangama Founder",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Srikrishna Rao K S",
    "role": "President",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "B S Kishan",
    "role": "Vice President",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Shreya P V",
    "role": "Secretary and Treasurer",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Keshav Nayak",
    "role": "Joint Secretary",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Amrith Naik",
    "role": "Folk Head",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Spoorthi Bailoor",
    "role": "Folk Head",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Shreya S Rao",
    "role": "Music Head",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Shraddha Upadhyaya",
    "role": "Music Head",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Prarthana Rao",
    "role": "Dance Head",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Avanthi",
    "role": "Dance Head",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Sumith S Hegde",
    "role": "Bhajan Head",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Harish Vishwanath Bhat",
    "role": "Bhajan Head",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Vivek Naik",
    "role": "Media Head",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Pratham P",
    "role": "Media Head",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Manish R Rao",
    "role": "Core Member",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Varun U Acharya",
    "role": "Core Member",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Amrutha R Rao",
    "role": "Core Member",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
  },
  {
    "name": "Shreya S Prabhu",
    "role": "Core Member",
    "url": "https://res.cloudinary.com/dfhg1joox/.jpg"
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