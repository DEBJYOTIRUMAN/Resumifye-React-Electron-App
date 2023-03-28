import React, { useState, useContext } from "react";
import avatar from "../../assets/user.png";
import EducationBox from "./EducationBox";
import EducationFilledBox from "./EducationFilledBox";
import ExperienceBox from "./ExperienceBox";
import ExperienceFilledBox from "./ExperienceFilledBox";
import InterestBox from "./InterestBox";
import InterestFilledBox from "./InterestFilledBox";
import LanguagesBox from "./LanguagesBox";
import LanguagesFilledBox from "./LanguagesFilledBox";
import SkillsBox from "./SkillsBox";
import SkillsFilledBox from "./SkillsFilledBox";
import { Formik } from "formik";
import * as Yup from "yup";
import { ResumifyeContext } from "../../ResumifyeContext";
import Modal from "react-modal";
import ShowTemplateModal from "./ShowTemplateModal";

const style = {
  wrapper: `flex-1 border-l border-[#38444d] p-10`,
  boxcontainer: `flex flex-col sm:mb-6 justify-around items-center sm:flex-row`,
  boxcontainer1: `flex flex-col-reverse sm:mb-6 justify-around items-center sm:flex-row`,
  boxcontainer2: `flex sm:mb-6 justify-around items-center`,
  box: `w-[90%] mb-6 sm:w-[40%] sm:mb-0`,
  boxarea: `mb-6 w-[90%] sm:mb-0`,
  customInput: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer text-xs`,
  fileSelected: `bg-[#2b6127] text-white px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer text-xs`,
};
const ModalStyles = {
  content: {
    top: "10%",
    bottom: "10%",
    left: "10%",
    right: "10%",
    backgroundColor: "",
    padding: 0,
    margin: 0,
    border: "none",
  },
  overlay: {
    backgroundColor: "#334250a7",
  },
};
const ResumeForm = ({ project }) => {
  const { user } = useContext(ResumifyeContext);
  // Education State
  const [addEducation, setAddEducation] = useState(false);
  const [educationList, setEducationList] = useState(
    project ? project.educations : []
  );
  // Experience State
  const [addExperience, setAddExperience] = useState(false);
  const [experienceList, setExperienceList] = useState(
    project ? project.experiences : []
  );
  // Skills State
  const [addSkills, setAddSkills] = useState(false);
  const [skillsList, setSkillsList] = useState(project ? project.skills : []);
  // Languages State
  const [addLanguages, setAddLanguages] = useState(false);
  const [languagesList, setLanguagesList] = useState(
    project ? project.languages : []
  );
  // Interest State
  const [addInterest, setAddInterest] = useState(false);
  const [interestList, setInterestList] = useState(
    project ? project.interests : []
  );

  const [profileImage, setProfileImage] = useState();
  const [showTemplate, setShowTemplate] = useState(false);
  const [resume, setResume] = useState({});

  const initialValues = {
    job: project ? project.job : "",
    projectName: project ? project.projectName : "",
    occupation: project ? project.occupation : "",
    name: project ? project.name : "",
    email: project ? project.email : "",
    address: project ? project.address : "",
    phone: project ? project.phone : "",
    country: project ? project.country : "",
    city: project ? project.city : "",
    linkedIn: project ? project.linkedIn : "",
    website: project ? project.website : "",
    message: project ? project.message : "",
  };

  const addFormSchema = Yup.object().shape({
    job: Yup.string()
      .required("Please enter wanted job title.")
      .min(3, "Job title must have at least 3 characters.")
      .max(50, "Job title has reached the character limit."),
    projectName: Yup.string()
      .required("Please enter project name.")
      .min(3, "Project name must have at least 3 characters.")
      .max(30, "Project name has reached the character limit."),
    occupation: Yup.string()
      .min(3, "Occupation name must have at least 3 characters.")
      .max(30, "Occupation name has reached the character limit."),
    name: Yup.string()
      .required("Please enter your name.")
      .min(3, "Name must have at least 3 characters.")
      .max(50, "Name has reached the character limit."),
    email: Yup.string()
      .email("Please enter valid email.")
      .required("Please enter your email."),
    address: Yup.string()
      .required("Please enter your address.")
      .min(10, "Address must have at least 10 characters.")
      .max(100, "Address has reached the character limit."),
    phone: Yup.string()
      .required("Please enter your phone number.")
      .matches(/^[0-9]+$/, "Please enter valid number.")
      .min(10, "Phone number must have at least 10 characters.")
      .max(15, "Phone number has reached the character limit."),
    country: Yup.string()
      .required("Please enter your country name.")
      .min(3, "Country name must have at least 3 characters.")
      .max(50, "Country name has reached the character limit."),
    city: Yup.string()
      .min(3, "City name must have at least 3 characters.")
      .max(30, "City name has reached the character limit."),
    linkedIn: Yup.string().url("Please enter valid url."),
    website: Yup.string().url("Please enter valid url."),
    message: Yup.string()
      .required("Please enter something about you.")
      .min(6, "Summary must have at least 6 characters.")
      .max(500, "Summary name has reached the character limit."),
  });

  const submitResume = (values) => {
    if (!user._id) return;
    if (!profileImage) {
      alert("Please upload your photo.");
      return;
    }
    let formData = new FormData();
    formData.append("userId", user._id);
    for (let [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    formData.append("image", profileImage);
    formData.append("educations", JSON.stringify(educationList));
    formData.append("experiences", JSON.stringify(experienceList));
    formData.append("skills", JSON.stringify(skillsList));
    formData.append("languages", JSON.stringify(languagesList));
    formData.append("interests", JSON.stringify(interestList));
    fetch("https://resumifye.onrender.com/api/resume", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((resume) => {
        setResume(resume);
        setShowTemplate(true);
      });
  };

  const updateResume = (values) => {
    if (!user._id) return;
    if (!project) {
      return;
    }
    let formData = new FormData();
    formData.append("userId", user._id);
    for (let [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    if (profileImage) {
      formData.append("image", profileImage);
    }
    formData.append("educations", JSON.stringify(educationList));
    formData.append("experiences", JSON.stringify(experienceList));
    formData.append("skills", JSON.stringify(skillsList));
    formData.append("languages", JSON.stringify(languagesList));
    formData.append("interests", JSON.stringify(interestList));
    fetch(`https://resumifye.onrender.com/api/resume/${project._id}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((resume) => {
        setResume(resume);
        setShowTemplate(true);
      });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          project ? updateResume(values) : submitResume(values);
        }}
        validationSchema={addFormSchema}
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
          <div className={style.wrapper}>
            <form>
              {/* Personal Details */}
              <div className="border-[#38444d] border-b">
                <div className={style.boxcontainer}>
                  <span className={`${style.boxarea} text-2xl sm:text-4xl`}>
                    Personal Details
                  </span>
                </div>
                <div className={style.boxcontainer1}>
                  <div className={style.box}>
                    <label
                      htmlFor="job"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Wanted Job Title
                    </label>
                    <input
                      type="text"
                      id="job"
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Software Engineer"
                      onChange={handleChange("job")}
                      onBlur={handleBlur("job")}
                      value={values.job}
                    />
                    {errors.job && touched.job ? (
                      <p className="text-red-600 font-medium">{errors.job}</p>
                    ) : null}
                  </div>
                  <div className={`${style.box} flex justify-end items-center`}>
                    <img
                      src={
                        profileImage
                          ? URL.createObjectURL(profileImage)
                          : project
                          ? project.image
                          : avatar
                      }
                      alt="Avatar"
                      className="h-14 w-14 rounded-full object-cover sm:h-16 sm:w-16"
                    />
                    <div className="ml-2">
                      <label
                        htmlFor="image-upload"
                        className={
                          profileImage || project
                            ? style.fileSelected
                            : style.customInput
                        }
                      >
                        <input
                          type="file"
                          id="image-upload"
                          accept=".jpg, .jpeg, .png"
                          className="hidden"
                          placeholder="Image URL"
                          onChange={(e) => setProfileImage(e.target.files[0])}
                        />
                        Upload Photo
                      </label>
                    </div>
                  </div>
                </div>

                <div className={style.boxcontainer}>
                  <div className={style.box}>
                    <label
                      htmlFor="projectName"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Project Name
                    </label>
                    <input
                      type="text"
                      id="projectName"
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="My Project"
                      onChange={handleChange("projectName")}
                      onBlur={handleBlur("projectName")}
                      value={values.projectName}
                    />
                    {errors.projectName && touched.projectName ? (
                      <p className="text-red-600 font-medium">
                        {errors.projectName}
                      </p>
                    ) : null}
                  </div>
                  <div className={style.box}>
                    <label
                      htmlFor="occupation"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Occupation
                    </label>
                    <input
                      type="text"
                      id="occupation"
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Student"
                      onChange={handleChange("occupation")}
                      onBlur={handleBlur("occupation")}
                      value={values.occupation}
                    />
                    {errors.occupation && touched.occupation ? (
                      <p className="text-red-600 font-medium">
                        {errors.occupation}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className={style.boxcontainer}>
                  <div className={style.box}>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Ruman Das"
                      onChange={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                    />
                    {errors.name && touched.name ? (
                      <p className="text-red-600 font-medium">{errors.name}</p>
                    ) : null}
                  </div>
                  <div className={style.box}>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="rumandas25@gmail.com"
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {errors.email && touched.email ? (
                      <p className="text-red-600 font-medium">{errors.email}</p>
                    ) : null}
                  </div>
                </div>

                <div className={style.boxcontainer}>
                  <div className={style.box}>
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="12 Grimmauld Place, London, UK"
                      onChange={handleChange("address")}
                      onBlur={handleBlur("address")}
                      value={values.address}
                    />
                    {errors.address && touched.address ? (
                      <p className="text-red-600 font-medium">
                        {errors.address}
                      </p>
                    ) : null}
                  </div>

                  <div className={style.box}>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="8250449610"
                      onChange={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      value={values.phone}
                    />
                    {errors.phone && touched.phone ? (
                      <p className="text-red-600 font-medium">{errors.phone}</p>
                    ) : null}
                  </div>
                </div>

                <div className={style.boxcontainer}>
                  <div className={style.box}>
                    <label
                      htmlFor="country"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="United Kingdom"
                      onChange={handleChange("country")}
                      onBlur={handleBlur("country")}
                      value={values.country}
                    />
                    {errors.country && touched.country ? (
                      <p className="text-red-600 font-medium">
                        {errors.country}
                      </p>
                    ) : null}
                  </div>

                  <div className={style.box}>
                    <label
                      htmlFor="city"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="London"
                      onChange={handleChange("city")}
                      onBlur={handleBlur("city")}
                      value={values.city}
                    />
                    {errors.city && touched.city ? (
                      <p className="text-red-600 font-medium">{errors.city}</p>
                    ) : null}
                  </div>
                </div>

                <div className={style.boxcontainer}>
                  <div className={style.box}>
                    <label
                      htmlFor="linkedIn"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      id="linkedIn"
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="https://www.linkedin.com"
                      onChange={handleChange("linkedIn")}
                      onBlur={handleBlur("linkedIn")}
                      value={values.linkedIn}
                    />
                    {errors.linkedIn && touched.linkedIn ? (
                      <p className="text-red-600 font-medium">
                        {errors.linkedIn}
                      </p>
                    ) : null}
                  </div>

                  <div className={style.box}>
                    <label
                      htmlFor="website"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="https://www.devruman.com"
                      onChange={handleChange("website")}
                      onBlur={handleBlur("website")}
                      value={values.website}
                    />
                    {errors.website && touched.website ? (
                      <p className="text-red-600 font-medium">
                        {errors.website}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className={style.boxcontainer}>
                  <div className={style.boxarea}>
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-400"
                    >
                      Professional Summary
                    </label>
                    <textarea
                      id="message"
                      rows="8"
                      className="block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Innovative Programmer and Internet Entrepreneur striving to make the world a more unified and connected place."
                      onChange={handleChange("message")}
                      onBlur={handleBlur("message")}
                      value={values.message}
                    ></textarea>
                    {errors.message && touched.message ? (
                      <p className="text-red-600 font-medium">
                        {errors.message}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Education Details */}
              <div className="border-[#38444d] border-b mt-6">
                <div className={style.boxcontainer2}>
                  <span className={`${style.box} text-2xl sm:text-3xl`}>
                    Education
                  </span>
                  <div className={style.box}>
                    <div className="flex justify-end items-center">
                      {!addEducation ? (
                        <button
                          type="button"
                          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-800 shadow-lg shadow-blue-800/80 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center"
                          onClick={() => setAddEducation(true)}
                        >
                          Add
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="text-gray-300 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 bg-gray-800 cursor-not-allowed"
                          disabled
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {addEducation ? (
                  <EducationBox
                    educationList={educationList}
                    setEducationList={setEducationList}
                    setAddEducation={setAddEducation}
                    style={style}
                  />
                ) : (
                  <EducationFilledBox
                    educationList={educationList}
                    setEducationList={setEducationList}
                    style={style}
                  />
                )}
              </div>

              {/* Experience Details */}
              <div className="border-[#38444d] border-b mt-6">
                <div className={style.boxcontainer2}>
                  <span className={`${style.box} text-2xl sm:text-3xl`}>
                    Experience
                  </span>
                  <div className={style.box}>
                    <div className="flex justify-end items-center">
                      {!addExperience ? (
                        <button
                          type="button"
                          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-800 shadow-lg shadow-teal-800/80 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center"
                          onClick={() => setAddExperience(true)}
                        >
                          Add
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="text-gray-300 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 bg-gray-800 cursor-not-allowed"
                          disabled
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {addExperience ? (
                  <ExperienceBox
                    experienceList={experienceList}
                    setExperienceList={setExperienceList}
                    setAddExperience={setAddExperience}
                    style={style}
                  />
                ) : (
                  <ExperienceFilledBox
                    experienceList={experienceList}
                    setExperienceList={setExperienceList}
                    style={style}
                  />
                )}
              </div>

              {/* Skills */}
              <div className="border-[#38444d] border-b mt-6">
                <div className={style.boxcontainer2}>
                  <span className={`${style.box} text-2xl sm:text-3xl`}>Skills</span>
                  <div className={style.box}>
                    <div className="flex justify-end items-center">
                      {!addSkills ? (
                        <button
                          type="button"
                          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-800 shadow-lg shadow-purple-800/80 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center"
                          onClick={() => setAddSkills(true)}
                        >
                          Add
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="text-gray-300 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 bg-gray-800 cursor-not-allowed"
                          disabled
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {addSkills ? (
                  <SkillsBox
                    skillsList={skillsList}
                    setSkillsList={setSkillsList}
                    setAddSkills={setAddSkills}
                    style={style}
                  />
                ) : (
                  <SkillsFilledBox
                    skillsList={skillsList}
                    setSkillsList={setSkillsList}
                    style={style}
                  />
                )}
              </div>

              {/* Languages  */}
              <div className="border-[#38444d] border-b mt-6">
                <div className={style.boxcontainer2}>
                  <span className={`${style.box} text-2xl sm:text-3xl`}>Languages</span>
                  <div className={style.box}>
                    <div className="flex justify-end items-center">
                      {!addLanguages ? (
                        <button
                          type="button"
                          className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-800 shadow-lg shadow-pink-800/80 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center"
                          onClick={() => setAddLanguages(true)}
                        >
                          Add
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="text-gray-300 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 bg-gray-800 cursor-not-allowed"
                          disabled
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {addLanguages ? (
                  <LanguagesBox
                    languagesList={languagesList}
                    setLanguagesList={setLanguagesList}
                    setAddLanguages={setAddLanguages}
                    style={style}
                  />
                ) : (
                  <LanguagesFilledBox
                    languagesList={languagesList}
                    setLanguagesList={setLanguagesList}
                    style={style}
                  />
                )}
              </div>

              {/* Interest */}
              <div className="border-[#38444d] border-b mt-6">
                <div className={style.boxcontainer2}>
                  <span className={`${style.box} text-2xl sm:text-3xl`}>Interest</span>
                  <div className={style.box}>
                    <div className="flex justify-end items-center">
                      {!addInterest ? (
                        <button
                          type="button"
                          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-800 shadow-lg shadow-cyan-800/80 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center"
                          onClick={() => setAddInterest(true)}
                        >
                          Add
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="text-gray-300 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 bg-gray-800 cursor-not-allowed"
                          disabled
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {addInterest ? (
                  <InterestBox
                    interestList={interestList}
                    setInterestList={setInterestList}
                    setAddInterest={setAddInterest}
                    style={style}
                  />
                ) : (
                  <InterestFilledBox
                    interestList={interestList}
                    setInterestList={setInterestList}
                    style={style}
                  />
                )}
              </div>
              {/* Footer */}
              <div className="py-10 mt-5">
                <div className={style.boxcontainer}>
                  <div className={style.box}>
                  </div>
                  <div className={`${style.box} flex justify-end items-center`}>
                    <button
                      type="button"
                      className={`font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                        isValid && (profileImage || project)
                          ? "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-800"
                          : "text-gray-300 bg-gray-800 cursor-not-allowed hover:bg-gray-800"
                      }`}
                      onClick={handleSubmit}
                      disabled={!isValid}
                    >
                      {project ? "Update" : "Create"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </Formik>
      <Modal
        isOpen={showTemplate}
        onRequestClose={() => setShowTemplate(false)}
        style={ModalStyles}
        ariaHideApp={false}
      >
        <ShowTemplateModal setShowTemplate={setShowTemplate} resume={resume} />
      </Modal>
    </>
  );
};
export default ResumeForm;
