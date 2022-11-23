import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const LanguagesBox = ({
  languagesList,
  setLanguagesList,
  setAddLanguages,
  style,
}) => {
  const initialValues = {
    language: "",
    level: 0,
  };

  const handleAddLanguages = ({ language, level }) => {
    const languagesValue = {
      language: language,
      level: level,
    };
    const copyLanguagesList = [...languagesList];
    copyLanguagesList.push(languagesValue);
    setLanguagesList(copyLanguagesList);
    setAddLanguages(false);
  };

  const addLanguagesSchema = Yup.object().shape({
    language: Yup.string()
      .required("Please enter language name.")
      .min(3, "Language name must have at least 3 characters.")
      .max(50, "Language name has reached the character limit."),
    level: Yup.number()
      .required("Please enter your language level.")
      .min(1, "Language level must be greater than zero."),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        handleAddLanguages(values);
      }}
      validationSchema={addLanguagesSchema}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        isValid
      }) => (
        <div>
          <div className={`${style.boxcontainer}`}>
            <div className={style.box}>
              <label
                htmlFor="language"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Language
              </label>
              <input
                type="text"
                id="language"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                placeholder="English"
                onChange={handleChange("language")}
                onBlur={handleBlur("language")}
                value={values.language}
              />
              {errors.language && touched.language ? (
                <p className="text-red-600 font-medium">{errors.language}</p>
              ) : null}
            </div>

            <div className={style.box}>
              <label
                htmlFor="level"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Level
              </label>
              <input
                type="range"
                id="level"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                onChange={handleChange("level")}
                onBlur={handleBlur("level")}
                value={values.level}
              />
              {errors.level && touched.level ? (
                <p className="text-red-600 font-medium">{errors.level}</p>
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
                onClick={() => setAddLanguages(false)}
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

export default LanguagesBox;
