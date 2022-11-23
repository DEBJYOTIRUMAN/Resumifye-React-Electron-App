import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import DownloadButton from "../components/templates/DownloadButton";
import { useNavigate } from "react-router-dom";
import "../template.css";

const Template1 = () => {
  const navigate = useNavigate();
  window.onpopstate = () => {
    navigate("/projects");
  };
  const { state } = useLocation();
  const template1Ref = useRef();
  const handlePrint = useReactToPrint({
    content: () => template1Ref.current,
    documentTitle: "Resume",
    onAfterPrint: () => {
      alert("Resume Download Success.");
      navigate("/projects");
    },
  });
  return (
    <div className="w-max mx-auto">
      <DownloadButton handlePrint={handlePrint} navigate={navigate} />
      <div className="body" ref={template1Ref}>
        <div className="wrapper">
          <div className="left_Side">
            <div className="profileText">
              <div className="imgBx">
                <img src={state.image} alt="Image" />
              </div>
              <h2 className="h2">
                {state.name}
                <br />
                <span>{state.job}</span>
              </h2>
            </div>
            <div className="contactInfo">
              <h3 className=" h3 title">Contact Info</h3>
              <ul>
                <li>
                  <span className="icon">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                  </span>
                  <span className="text">{state.phone}</span>
                </li>
                <li>
                  <span className="icon">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </span>
                  <span className="text">{state.email}</span>
                </li>
                {state.website !== "" && (
                  <li>
                    <span className="icon">
                      <i className="fa fa-globe" aria-hidden="true"></i>
                    </span>
                    <span className="text">{state.website}</span>
                  </li>
                )}
                {state.linkedIn !== "" && (
                  <li>
                    <span className="icon">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </span>
                    <span className="text">{state.linkedIn}</span>
                  </li>
                )}
                <li>
                  <span className="icon">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                  </span>
                  <span className="text">{`${state.address}, ${state.country}`}</span>
                </li>
              </ul>
            </div>
            {state.educations.length !== 0 && (
              <div className="contactInfo education">
                <h3 className="title h3">EDUCATION</h3>
                <ul>
                  {state.educations.map((education, index) => (
                    <EducationList key={index} education={education} />
                  ))}
                </ul>
              </div>
            )}
            {state.languages.length !== 0 && (
              <div className="contactInfo language">
                <h3 className=" h3 title">LANGUAGES</h3>
                <ul>
                  {state.languages.map((language, index) => (
                    <LanguageList key={index} language={language} />
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="right_Side">
            <div className="about">
              <h2 className=" h2 title2">Profile</h2>
              <p className="pTag">{state.message}</p>
            </div>
            {state.experiences.length !== 0 && (
              <div className="about">
                <h2 className=" h2 title2">Experience</h2>
                {state.experiences.map((experience, index) => (
                  <ExperienceList key={index} experience={experience} />
                ))}
              </div>
            )}
            {state.skills.length !== 0 && (
              <div className="about skills">
                <h2 className="h2 title2">Professional Skills</h2>
                {state.skills.map((skill, index) => (
                  <SkillList key={index} skill={skill} />
                ))}
              </div>
            )}
            {state.interests.length !== 0 && (
              <div className="About interest">
                <h2 className="h2 title2">Interest</h2>
                <ul>
                  {state.interests.map((interest, index) => (
                    <InterestList key={index} interest={interest} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const EducationList = ({ education }) => (
  <li>
    <h5 className="h5">{`${education.startDegree} - ${education.endDegree}`}</h5>
    <h4 className="h4">{education.degree}</h4>
    <h4 className="h4">{education.university}</h4>
  </li>
);
const LanguageList = ({ language }) => (
  <li>
    <span className="text">{language.language}</span>
    <span className="percent"></span>
    <div style={{ width: `${language.level}%` }}></div>
  </li>
);
const ExperienceList = ({ experience }) => (
  <div className="box">
    <div className="year_company">
      <h5 className="h5">{`${experience.startJob} - ${experience.endJob}`}</h5>
      <h5 className="h5">{experience.company}</h5>
    </div>
    <div className="text">
      <h4 className="h4">{experience.title}</h4>
      <p className="pTag">{experience.description}</p>
    </div>
  </div>
);
const SkillList = ({ skill }) => (
  <div className="box">
    <h4 className="h4">{skill.skill}</h4>
    <div className="percent">
      <div style={{ width: `${skill.level}%` }}></div>
    </div>
  </div>
);
const InterestList = ({ interest }) => (
  <li>
    <i className="fa fa-circle" aria-hidden="true"></i>
    {interest.topic}
  </li>
);
export default Template1;
