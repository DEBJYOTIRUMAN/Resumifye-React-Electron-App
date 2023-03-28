import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const SkillsBox = ({ skillsList, setSkillsList, setAddSkills, style }) => {
  const initialValues = {
    skill: "",
    level: 0,
  };

  const handleAddSkills = ({ skill, level }) => {
    const skillsValue = {
      skill: skill,
      level: level,
    };
    const copySkillsList = [...skillsList];
    copySkillsList.push(skillsValue);
    setSkillsList(copySkillsList);
    setAddSkills(false);
  };

  const addSkillsSchema = Yup.object().shape({
    skill: Yup.string()
      .required("Please enter skill name.")
      .min(3, "Skill name must have at least 3 characters.")
      .max(50, "Skill name has reached the character limit."),
    level: Yup.number()
      .required("Please enter your skill level.")
      .min(1, "Skill level must be greater than zero."),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        handleAddSkills(values);
      }}
      validationSchema={addSkillsSchema}
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
                htmlFor="skill"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Skill
              </label>
              <input
                type="text"
                id="skill"
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="JavaScript"
                onChange={handleChange("skill")}
                onBlur={handleBlur("skill")}
                value={values.skill}
              />
              {errors.skill && touched.skill ? (
                <p className="text-red-600 font-medium">{errors.skill}</p>
              ) : null}
            </div>

            <div className={style.box}>
              <label
                htmlFor="level"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Level
              </label>
              <input
                type="range"
                id="level"
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                onClick={() => setAddSkills(false)}
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

export default SkillsBox;
