import React from "react";

const Index = () => {
  return (
    <>
      <div className="bg-white py-16 m-10">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:flex md:gap-6 md:space-y-0 lg:items-center lg:gap-12">
            <div className="md:w-5/12 lg:w-5/12">
              <img
                src="https://static.toiimg.com/photo/imgsize-1444617,msid-68362464/68362464.jpg"
                alt="image"
                loading="lazy"
                className="rounded-xl"
              />
            </div>
            <div className="md:7/12 lg:w-6/12">
              <h2 className="inline-block border-b border-[#D9A15C] text-2xl font-bold text-gray-900 md:text-4xl ">
                Story
              </h2>
              <p className="mt-6 text-gray-600">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum
                omnis voluptatem accusantium nemo perspiciatis delectus atque
                autem! Voluptatum tenetur beatae unde aperiam, repellat expedita
                consequatur! Officiis id consequatur atque doloremque!
              </p>
              <p className="mt-4 text-gray-600">
                Nobis minus voluptatibus pariatur dignissimos libero quaerat
                iure expedita at? Asperiores nemo possimus nesciunt dicta veniam
                aspernatur quam mollitia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
