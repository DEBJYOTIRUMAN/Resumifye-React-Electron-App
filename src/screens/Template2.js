import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import DownloadButton from "../components/templates/DownloadButton";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import "../template.css";

const Template2 = () => {
  const navigate = useNavigate();
  window.onpopstate = () => {
    navigate("/projects");
  };
  const { state } = useLocation();
  const template2Ref = useRef();
  const handlePrint = useReactToPrint({
    content: () => template2Ref.current,
    documentTitle: "Resume",
    onAfterPrint: () => {
      alert("Resume Download Success.");
      navigate("/projects");
    },
  });
  return (
    <div className="w-max mx-auto">
      <DownloadButton handlePrint={handlePrint} navigate={navigate} />
      <div className="body2" ref={template2Ref}>
        <div>
          <div className="resume-box">
            <div className="box-1">
              <img src={state.image} className="profile" alt="Image" />
              <div className="content">
                <h1 className="h1t2">About me</h1>
                <p className="pTag2">{state.message}</p>
                <br />
                {state.languages.length !== 0 && (
                  <>
                    <h3 className="h1t2">LANGUAGES</h3>
                    <ul>
                      {state.languages.map((language, index) => (
                        <LanguageList key={index} language={language} />
                      ))}
                    </ul>
                  </>
                )}
                <br />
                <h1 className="h1t2">Contact</h1>

                <p className="pTag2">
                  <i className="fa fa-map fa-m"></i> &nbsp;{state.address}, {state.country}
                </p>
                <p className="pTag2">
                  <i className="fa fa-phone fa-m w-[13px]"></i> &nbsp;Phone :{" "}
                  {state.phone}
                </p>
                <p className="pTag2">
                  <i className="fa fa-envelope fa-m"></i> &nbsp;Email :{" "}
                  {state.email}
                </p>
                {state.website !== "" && (
                  <p className="pTag2">
                    <i className="fa fa-globe fa-m w-[13px]"></i> &nbsp;
                    {state.website}
                  </p>
                )}
                {state.linkedIn !== "" && (
                  <p className="pTag2">
                    <i className="fa fa-linkedin fa-m w-[13px]"></i> &nbsp;
                    {state.linkedIn}
                  </p>
                )}
              </div>
            </div>

            <div className="box-2">
              <div className="intro">
                <br />
                <h1 className="h1t2 ma">{state.name.split(" ")[0]}</h1>
                <h1 className="h1t2">
                  {" "}
                  <strong>{state.name.split(" ").pop()}</strong>
                </h1>

                <p className="pTag2 phead">{state.job}</p>
                <div className="clearfix"></div>
                <hr className="hr1" />
              </div>
              <br />
              <br />
              <br />
              {state.experiences.length !== 0 && (
                <div className="content-2">
                  <h1 className="h1t2 head">Experience</h1>
                  <hr className="hr2" />
                  <div className="clearfix"></div>
                  {state.experiences.map((experience, index) => (
                    <ExperienceList key={index} experience={experience} />
                  ))}
                </div>
              )}
              {state.educations.length !== 0 && (
                <div className="content-2">
                  <h1 className="h1t2 head">Education</h1>
                  <hr className="hr2" />
                  <div className="clearfix"></div>
                  {state.educations.map((education, index) => (
                    <EducationList key={index} education={education} />
                  ))}
                </div>
              )}
              {state.skills.length !== 0 && (
                <>
                  <h1 className="h1t2 head">Skills</h1>
                  <hr className="hr2" />
                  {state.skills.map((skill, index) => (
                    <SkillList key={index} skill={skill} />
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  );
};
const LanguageList = ({ language }) => (
  <>
    <div className="clearfix"></div>
    <div className="col-div-4">
      <p className="pTag2 p26">{language.language}</p>
    </div>
    <div className="col-div-6">
      <i
        className={`fa fa-circle fa-m ${
          language.level <= 20 ? "circle" : "circle1"
        }`}
      ></i>
      <i
        className={`fa fa-circle fa-m ${
          language.level <= 40 ? "circle" : "circle1"
        }`}
      ></i>
      <i
        className={`fa fa-circle fa-m ${
          language.level <= 60 ? "circle" : "circle1"
        }`}
      ></i>
      <i
        className={`fa fa-circle fa-m ${
          language.level <= 80 ? "circle" : "circle1"
        }`}
      ></i>
      <i
        className={`fa fa-circle fa-m ${
          language.level <= 100 ? "circle" : "circle1"
        }`}
      ></i>
    </div>
    <div className="clearfix"></div>
  </>
);

const ExperienceList = ({ experience }) => (
  <>
    <p className="pTag2 para-1">
      {experience.title} In {experience.company}{" "}
      <strong>({`${experience.startJob} - ${experience.endJob}`})</strong>
    </p>
    <p className="pTag2 para-2">{experience.description}</p>
  </>
);

const EducationList = ({ education }) => (
  <>
    <p className="pTag2 para-1">
      {education.degree}
      <strong> ({`${education.startDegree} - ${education.endDegree}`})</strong>
    </p>
    <p className="pTag2 para-2">
      {education.degree} at {education.university}
    </p>
  </>
);

const SkillList = ({ skill }) => (
  <>
    <div className="clearfix"></div>
    <div className="col-div-4">
      <p className="pTag2 p25">{skill.skill}</p>
    </div>
    <div className="col-div-6">
      <i
        className={`fa fa-circle fa-m ${skill.level <= 20 ? "circle" : "circle1"}`}
      ></i>
      <i
        className={`fa fa-circle fa-m ${skill.level <= 40 ? "circle" : "circle1"}`}
      ></i>
      <i
        className={`fa fa-circle fa-m ${skill.level <= 60 ? "circle" : "circle1"}`}
      ></i>
      <i
        className={`fa fa-circle fa-m ${skill.level <= 80 ? "circle" : "circle1"}`}
      ></i>
      <i
        className={`fa fa-circle fa-m ${skill.level <= 100 ? "circle" : "circle1"}`}
      ></i>
    </div>
    <div className="clearfix"></div>
  </>
);
export default Template2;
