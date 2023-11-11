import Reveal from "../Animations/reveal";
import ScrollLag from "../Animations/scrollLag";
import Image from "next/image";

type BannerProps = {
  video?: string;
  photo?: string;
  text: string;
  credits?: string;
};

const Banner: React.FC<BannerProps> = ({ photo, text, video, credits }) => {

  return (
    <div className="relative h-80 w-full overflow-hidden">
      { photo && <div className="absolute inset-0">
        <Image
          src={photo}
          alt="Banner"
          fill
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      </div> }
      { video && <div className="absolute inset-0">
        <video src={video} autoPlay loop controls={false} muted className="object-cover object-center absolute inset-0 h-full w-full opacity-75" />
        {credits && <div className="absolute bottom-0 right-0 bg-black/30 text-xs md:text-sm p-1">{credits}</div>}
      </div> }
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
    </div>
  );
};

export default Banner;