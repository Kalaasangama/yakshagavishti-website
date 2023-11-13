import AllCards from "~/components/Team/Allcards";
import Reveal from "~/components/Animations/reveal";
import Link from "next/link";
import Image from "next/image";

const team = () => {
  return (
    <div className="mt-[4.75rem] sm:mt-[5.75rem] md:mt-24 lg:mt-[6.25rem] min-h-[50vh] flex flex-col justify-center">
      <div className="m-10 py-6 flex items-center">
        <div className="container m-auto px-2 md:px-12 xl:px-6 flex justify-center">
            <div className="sm:mx-2 md:w-6/12 lg:mx-0 lg:w-6/12 flex flex-col gap-5 items-center">
              <Reveal classes="">
                {/* <h2 className="inline-block font-hindi text-3xl font-bold sm:text-5xl md:text-5xl 2xl:text-5xl"> */}
                <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl font-rhomdon">
                  Finite <span className="text-secondary-100">Loop Club</span>
                </h2>
              </Reveal>
              <Reveal classes="flex justify-center items-center">
                <Image
                  src="https://res.cloudinary.com/dfhg1joox/image/upload/v1699890925/yakshagavishti/assets/team/flc_logo.png"
                  alt="image"
                  height={300}
                  width={300}
                  className=" max-w-full lg:mt-0 w-64 md:w-72 lg:w-96 object-contain object-center"
                  priority
                />
              </Reveal>
              <Reveal classes="">
                <p className="text-center text-base md:text-lg xl:text-xl">
                  <span>Finite Loop is a Coding Club, which aims to give a good perspective of development, and encourages students to realize their ideas. We encourage students to participate in competitive programming and thus, inspire the next.</span> <Link className="text-secondary-100 hover:text-secondary-200" href={"https://www.finiteloop.co.in/"}>Read More</Link>
                </p>
              </Reveal>
            </div>
        </div>
      </div>
      <div className=" text-center ">
        <Reveal classes="">
          <div className="text-3xl font-bold md:text-4xl lg:text-5xl font-rhomdon">
          Yakshagavishti&rsquo;s Code Wizards
          </div>
        </Reveal>
        <Reveal classes="">
          <div className="p-4 text-xl lg:text-4xl">MEET THE DEVELOPERS</div>
        </Reveal>
      </div>
      <div className="m-4">
        <AllCards />
      </div>
    </div>
  );
}

export default team
