import { useTranslations } from "next-intl";
import React from "react";
import Card from "~/components/About/Aboutcard";
import { getMembers } from "~/utils/translations";

const AboutCardsSection: React.FC = () => {
  const t = useTranslations("Members");
  const members = getMembers(t);

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