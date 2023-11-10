import Reveal from "../Animations/reveal";
import ScrollLag from "../Animations/scrollLag";
import Image from "next/image";

type BannerProps = {
  photo: string;
  text: string;
};

const Banner: React.FC<BannerProps> = ({ photo, text}) => {

  return (
    <div className="relative h-80 w-full overflow-hidden">
      <div
        className="absolute inset-0 flex items-center justify-center"
      >
        <ScrollLag classes="mb-10 lg:mb-44" speed={200}>
          <Reveal classes="">
            <div
              className={`text-center text-4xl font-black lg:text-7xl`}
            >
              {text}
            </div>
          </Reveal>
        </ScrollLag>
      </div>
      <div className="absolute inset-0">
        <Image
          src={photo}
          alt="Banner"
          fill
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
      </div>
    </div>
  );
};

export default Banner;