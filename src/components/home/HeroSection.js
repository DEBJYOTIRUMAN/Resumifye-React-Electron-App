import React from "react";
import poster from "../../assets/poster.jpg";
import resizer from "../../assets/resizer.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="md:px-4 xl:px-20">
      <section className="text-gray-600 body-font border-[#38444d] border-b">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={poster}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-300">
              Build Resume
            </h1>
            <p className="mb-8 leading-relaxed">
              Creating a resume is a daunting task. Nothing but stress,
              confusion, and wasting precious hours on making a good-looking
              template. But not with Resumifye. Let us take over.
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
                onClick={() => navigate("/resume")}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={resizer}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-300">
              Image Resizer
            </h1>
            <p className="mb-8 leading-relaxed">
              Use our fast, easy, and free online photo resizer to change the
              dimensions of any picture.
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
                onClick={() => navigate("/resizer")}
              >
                Resize
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
