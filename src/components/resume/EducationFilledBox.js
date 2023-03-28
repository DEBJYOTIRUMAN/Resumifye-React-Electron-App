import React from "react";
import { BsTrash } from "react-icons/bs";

const EducationFilledBox = ({
  educationList,
  setEducationList,
  style,
}) => {
  const deleteEducationFilledBox = (index) => {
    const copyEducationList = [...educationList];
    setEducationList(copyEducationList.filter((item, i) => i !== index));
  };
  return educationList.length !== 0 ? (
    <>
      {educationList.map((list, index) => (
        <div key={index}>
          <div className={`${style.boxarea} mx-auto`}>
            <div className="flex justify-between items-center shadow-md rounded-lg mb-6 bg-[#15202b] p-5 border-[#38444d] border">
              <span className="text-lg font-medium text-gray-300">
                {list.degree} at {list.university}
              </span>
              <div
                className="w-10 h-10 flex justify-center items-center rounded-full hover:bg-slate-800"
                onClick={() => deleteEducationFilledBox(index)}
              >
                <BsTrash size={21} color="#e11d48" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  ) : (
    <></>
  );
};

export default EducationFilledBox;
