import React from "react";

const DownloadButton = ({ handlePrint, navigate }) => {
  return (
    <div className="flex justify-between items-center m-10">
      <button
        type="button"
        className="border hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center border-blue-500 text-blue-500 hover:text-white focus:ring-blue-800 rotate-180"
        onClick={() => navigate("/projects")}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Icon description</span>
      </button>

      <button
        type="button"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-800 shadow-lg shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={handlePrint}
      >
        Print Resume
      </button>
    </div>
  );
};

export default DownloadButton;
