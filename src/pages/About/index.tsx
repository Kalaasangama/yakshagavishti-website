import React from "react";
import  MyComponent from "~/components/CardsSection";

const Index = () => {
  return (
    <>
      <div className="m-10 py-6">
        <div className="container m-auto px-6 text-white md:px-12 xl:px-6">
          <div className="space-y-6 md:flex md:gap-6 md:space-y-0 lg:items-center lg:gap-12">
            <div className="md:w-5/12 lg:w-5/12 mx-10 lg:mx-15">
              <img
                src="/1.png"
                alt="image"
                loading="lazy"
                className=" h-96 max-w-full rounded-2xl md:w-auto md:mx-0 sm: mx-0"
              />
            </div>
            <div className="md:w-6/12 lg:w-6/12">
              <h2 className="inline-block border-b border-[#D9A15C] text-2xl font-bold text-white md:text-4xl">
                Team Yakshasangama
              </h2>
              <p className="mt-6 text-white">
                In just a year since our inception, Team Yakshasangama has
                emerged as a promising team of young artists across the off
                centre campus of Nitte DU, securing champion titles in three out
                of five competitions and numerous individual prizes.
              </p>
              <p className="mt-4 text-white">
                Our passion for Yakshagana fuels our journey, and we are excited
                to continue this remarkable ascent in the world of this
                cherished art form.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center px-6 text-4xl font-bold text-white pt-4">Our Members</div>
        <MyComponent />
      </div>
    </>
  );
};

export default Index;
