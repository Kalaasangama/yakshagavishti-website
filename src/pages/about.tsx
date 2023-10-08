import React from "react";
import AllCards from "~/components/About/CardsSection";

const Index = () => {
  return (
    <>
      <div className="mx-4 sm:mx-8 lg:mx-32">
        <div className="m-auto px-6 md:px-12 xl:px-6">
          <div className="space-y-6 md:flex md:gap-6 md:space-y-0 lg:items-center lg:gap-12">
            <div className="md:w-5/12 lg:w-5/12">
              <img
                src="/1.png"
                alt="image"
                loading="lazy"
                className="h-auto max-w-full rounded-2xl md:w-auto"
              />
            </div>
            <div className="md:w-6/12 lg:w-6/12">
              <h2 className="inline-block border-b border-[#D9A15C] text-2xl font-bold md:text-4xl">
                Team Yakshasangama
              </h2>
              <p className="mt-6">
                In just a year since our inception, Team Yakshasangama has
                emerged as a promising team of young artists across the off
                centre campus of Nitte DU, securing champion titles in three out
                of five competitions and numerous individual prizes.
              </p>
              <p className="mt-4">
                Our passion for Yakshagana fuels our journey, and we are excited
                to continue this remarkable ascent in the world of this
                cherished art form.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 sm:mx-8 lg:mx-32 text-4xl ">
        <div className="font-bold pt-4">Our Members</div>
        <AllCards />
      </div>
    </>
  );
};

export default Index;
