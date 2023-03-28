import React from "react";
import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();
  return (
      <section className="flex-1 min-h-screen bg-gray-900 border-l border-[#38444d]">
        <div className="container relative flex flex-col min-h-screen px-4 py-8 mx-auto sm:px-6">
          <section className="flex items-center flex-1">
            <div className="flex flex-col w-full ">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-center lg:text-7xl 2xl:text-8xl">
                <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-200 via-indigo-300 to-sky-500">
                  Coming
                </span>

                <span className="text-transparent bg-gradient-to-tr bg-clip-text from-sky-300 via-pink-300 to-red-500">
                  Soon
                </span>
              </h1>

              <p className="max-w-3xl mx-auto mt-6 text-lg text-center text-white md:text-xl">
                We are almost there! If you want to get notified when the
                feature goes live, subscribe to our mailing list.
              </p>

              <div className="flex flex-col mt-8 space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0">
                <input
                  id="email"
                  type="text"
                  className="sm:w-1/2 lg:w-1/3 px-6 py-3 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:ring-blue-300 focus:ring-opacity-40 focus:border-blue-300 focus:outline-none focus:ring sm:mx-2"
                  placeholder="Email Address"
                />

                <button
                  type="button"
                  className="px-8 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none sm:mx-2"
                  onClick={() => navigate("/home")}
                >
                  Notify Me
                </button>
              </div>

              <p className="mt-8 text-center text-white text-md md:text-xl">
                🔔Notify me when this feature is launched :)
              </p>
            </div>
          </section>
        </div>
      </section>
  );
};

export default ComingSoon;
