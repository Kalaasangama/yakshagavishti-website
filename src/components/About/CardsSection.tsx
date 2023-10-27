import React from "react";
import Card from "./Aboutcard";
import { useRouter } from "next/router";
import en from "~/locale/en/about";
import kn from "~/locale/kn/about";

const AboutCardsSection: React.FC = () => {
  const router = useRouter()
  const t = router.locale === "en" ? en.members : kn.members

  return (
    <div className="flex my-8 items-center justify-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {t.map((member, idx) => (
          <Card key={idx} {...member} url={`/${idx+1}.png`} />
        ))}
      </div>
    </div>
  );
};

export default AboutCardsSection;
