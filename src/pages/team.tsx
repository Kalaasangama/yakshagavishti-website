import AllCards from "~/components/Team/Allcards";
import Reveal from "~/components/Animations/reveal";
import Link from "next/link";
import Banner from "~/components/About/Banner";
import Image from "next/image";

const team = () => {
  return (
    <div className="mt-[4.75rem] sm:mt-[5.75rem] md:mt-24 lg:mt-[6.25rem] min-h-[50vh] flex flex-col justify-center">
      <Banner photo={"/collegeAbout.webp"} text={`About Finite Loop Club`}/>
      <div className="m-10 py-6 flex items-center">
        <div className="container m-auto px-6 md:px-12 xl:px-6">
          <div className="space-y-6 md:flex md:gap-6 md:space-y-0 lg:items-center lg:gap-12">
            <Reveal classes="lg:mx-15 mx-0 md:w-5/12 lg:w-5/12 flex justify-center items-center">
              <Image
                src="/Cloudinary/team/flc_logo.png"
                alt="image"
                height={300}
                width={300}
                className=" max-w-full lg:mt-0 w-64 md:w-72 lg:w-96 object-contain object-center"
              />
            </Reveal>
            <div className="sm:mx-4 md:w-6/12 lg:mx-0 lg:w-6/12">
              <Reveal classes="">
                <h2 className="inline-block font-hindi text-xl font-bold sm:text-4xl md:text-4xl 2xl:text-5xl">
                  {`about`} <span className="text-secondary-100">{`Finite Loop Club`}</span>
                </h2>
              </Reveal>
              <Reveal classes="">
                <p className="mt-6 text-justify text-xs sm:text-sm md:text-base lg:text-base xl:text-lg">
                  <span>Finite Loop is a Coding Club, which aims to give a good perspective of development, and encourages students to realize their ideas. We encourage students to participate in competitive programming and thus, inspire the next.</span> <Link className="text-secondary-100 hover:text-secondary-200" href={"https://www.finiteloop.co.in/"}>Read More</Link>
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <div className=" text-center ">
        <div className="text-4xl font-bold italic md:text-6xl lg:text-7xl">
          Kalasangama&rsquo;s Code Wizards
        </div>
        <div className="p-4 text-2xl lg:text-4xl">MEET THE DEVELOPERS</div>
      </div>
      <div className="m-4">
        <AllCards />
      </div>
    </div>
  );
}

export default team
