import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const EducationBox = ({
  educationList,
  setEducationList,
  setAddEducation,
  style,
}) => {
  const initialValues = {
    university: "",
    degree: "",
    startDegree: "",
    endDegree: "",
  };

  const handleAddEducation = ({
    university,
    degree,
    startDegree,
    endDegree,
  }) => {
    const educationValue = {
      university: university,
      degree: degree,
      startDegree: startDegree,
      endDegree: endDegree,
    };
    const copyEducationList = [...educationList];
    copyEducationList.push(educationValue);
    setEducationList(copyEducationList);
    setAddEducation(false);
  };

  const addEducationSchema = Yup.object().shape({
    university: Yup.string()
      .required("Please enter university name.")
      .min(6, "University name must have at least 6 characters.")
      .max(100, "University name has reached the character limit."),
    degree: Yup.string()
      .required("Please enter degree name.")
      .min(6, "Degree name must have at least 6 characters.")
      .max(100, "Degree name has reached the character limit."),
    startDegree: Yup.string()
      .required("Please enter start year.")
      .matches(/^[0-9]{4}$/, "Please enter valid year."),
    endDegree: Yup.string()
      .required("Please enter end year.")
      .matches(/^[0-9]{4}$/, "Please enter valid year."),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        handleAddEducation(values);
      }}
      validationSchema={addEducationSchema}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <div>
          <div className={`${style.boxcontainer}`}>
            <div className={style.box}>
              <label
                htmlFor="university"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                School/College/University
              </label>
              <input
                type="text"
                id="university"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                placeholder="University of North Texas"
                onChange={handleChange("university")}
                onBlur={handleBlur("university")}
                value={values.university}
              />
              {errors.university && touched.university ? (
                <p className="text-red-600 font-medium">{errors.university}</p>
              ) : null}
            </div>

            <div className={style.box}>
              <label
                htmlFor="degree"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Degree
              </label>
              <input
                type="text"
                id="degree"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                placeholder="Undergraduate in Computer Science"
                onChange={handleChange("degree")}
                onBlur={handleBlur("degree")}
                value={values.degree}
              />
              {errors.degree && touched.degree ? (
                <p className="text-red-600 font-medium">{errors.degree}</p>
              ) : null}
            </div>
          </div>

          <div className={style.boxcontainer}>
            <div className={style.box}>
              <label
                htmlFor="startDegree"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Start Year
              </label>
              <input
                type="text"
                id="startDegree"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                onChange={handleChange("startDegree")}
                onBlur={handleBlur("startDegree")}
                value={values.startDegree}
                placeholder="2012"
              />
              {errors.startDegree && touched.startDegree ? (
                <p className="text-red-600 font-medium">{errors.startDegree}</p>
              ) : null}
            </div>

            <div className={style.box}>
              <label
                htmlFor="endDegree"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                End Year
              </label>
              <input
                type="text"
                id="endDegree"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                onChange={handleChange("endDegree")}
                onBlur={handleBlur("endDegree")}
                value={values.endDegree}
                placeholder="2016"
              />
              {errors.endDegree && touched.endDegree ? (
                <p className="text-red-600 font-medium">{errors.endDegree}</p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-center items-center mb-6">
            <div className={`${style.boxarea} flex justify-end items-center`}>
              <button
                type="button"
                className={`font-medium rounded-lg px-5 py-2.5 text-center mr-5 mb-2 text-xs sm:text-sm ${
                  isValid
                    ? "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80"
                    : "text-gray-900 dark:text-gray-300 bg-gray-800 dark:bg-gray-800 cursor-not-allowed hover:bg-gray-800 hover:dark:bg-gray-800"
                }`}
                onClick={handleSubmit}
                disabled={!isValid}
              >
                Submit
              </button>

              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center mb-2"
                onClick={() => setAddEducation(false)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default EducationBox;
