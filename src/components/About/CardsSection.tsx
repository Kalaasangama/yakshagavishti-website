import React from "react";
import Card from "./Aboutcard";

const members = [
  {
    name: "Kalaasangama Team",
    role: "President",
    desc: "",
  },
]

const AboutCardsSection: React.FC = () => {
  return (
    <div className="flex my-8 items-center justify-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member, idx) => (
          <Card key={idx} {...member} url={`/${idx+1}.png`} />
        ))}
      </div>
    </div>
  );
};

export default AboutCardsSection;
