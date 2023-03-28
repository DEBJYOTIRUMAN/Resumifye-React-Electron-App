import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const ExperienceBox = ({
  experienceList,
  setExperienceList,
  setAddExperience,
  style,
}) => {
  const initialValues = {
    title: "",
    company: "",
    startJob: "",
    endJob: "",
    description: "",
  };

  const handleAddExperience = ({
    title,
    company,
    startJob,
    endJob,
    description,
  }) => {
    const experienceValue = {
      title: title,
      company: company,
      startJob: startJob,
      endJob: endJob,
      description: description,
    };
    const copyExperienceList = [...experienceList];
    copyExperienceList.push(experienceValue);
    setExperienceList(copyExperienceList);
    setAddExperience(false);
  };

  const addExperienceSchema = Yup.object().shape({
    title: Yup.string()
      .required("Please enter job title.")
      .min(6, "Title must have at least 6 characters.")
      .max(100, "Title has reached the character limit."),
    company: Yup.string()
      .required("Please enter company name.")
      .min(3, "Company name must have at least 3 characters.")
      .max(100, "Company name has reached the character limit."),
    startJob: Yup.string()
      .required("Please enter start year.")
      .matches(/^[0-9]{4}$/, "Please enter valid year."),
    endJob: Yup.string()
      .required("Please enter end year.")
      .matches(/^[0-9]{4}$/, "Please enter valid year."),
    description: Yup.string()
      .required("Please enter job description.")
      .min(6, "Description must have at least 6 characters.")
      .max(200, "Description has reached the character limit."),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        handleAddExperience(values);
      }}
      validationSchema={addExperienceSchema}
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
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Full Stack Web Developer"
                onChange={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
              />
              {errors.title && touched.title ? (
                <p className="text-red-600 font-medium">{errors.title}</p>
              ) : null}
            </div>

            <div className={style.box}>
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Microsoft"
                onChange={handleChange("company")}
                onBlur={handleBlur("company")}
                value={values.company}
              />
              {errors.company && touched.company ? (
                <p className="text-red-600 font-medium">{errors.company}</p>
              ) : null}
            </div>
          </div>

          <div className={style.boxcontainer}>
            <div className={style.box}>
              <label
                htmlFor="startJob"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Start Year
              </label>
              <input
                type="text"
                id="startJob"
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                onChange={handleChange("startJob")}
                onBlur={handleBlur("startJob")}
                value={values.startJob}
                placeholder="2016"
              />
              {errors.startJob && touched.startJob ? (
                <p className="text-red-600 font-medium">{errors.startJob}</p>
              ) : null}
            </div>

            <div className={style.box}>
              <label
                htmlFor="endJob"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                End Year
              </label>
              <input
                type="text"
                id="endJob"
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                onChange={handleChange("endJob")}
                onBlur={handleBlur("endJob")}
                value={values.endJob}
                placeholder="2018"
              />
              {errors.endJob && touched.endJob ? (
                <p className="text-red-600 font-medium">{errors.endJob}</p>
              ) : null}
            </div>
          </div>

          <div className={style.boxcontainer}>
            <div className={style.boxarea}>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-400"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="8"
                className="block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Implemented and updated application modules under the direction of Senior Software Developers."
                onChange={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
              ></textarea>
              {errors.description && touched.description ? (
                <p className="text-red-600 font-medium">{errors.description}</p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-center items-center mb-6">
            <div className={`${style.boxarea} flex justify-end items-center`}>
              <button
                type="button"
                className={`font-medium rounded-lg px-5 py-2.5 text-center mr-5 mb-2 text-xs sm:text-sm ${
                  isValid
                    ? "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-800 shadow-lg shadow-green-800/80"
                    : "text-gray-300 bg-gray-800 cursor-not-allowed hover:bg-gray-800"
                }`}
                onClick={handleSubmit}
                disabled={!isValid}
              >
                Submit
              </button>

              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-800 shadow-lg shadow-red-800/80 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center mb-2"
                onClick={() => setAddExperience(false)}
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

export default ExperienceBox;
