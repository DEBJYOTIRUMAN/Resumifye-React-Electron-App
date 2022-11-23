import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import DownloadButton from "../components/templates/DownloadButton";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import "../template.css";

const Template3 = () => {
  const navigate = useNavigate();
  window.onpopstate = () => {
    navigate("/projects");
  };
  const { state } = useLocation();
  const template3Ref = useRef();
  const handlePrint = useReactToPrint({
    content: () => template3Ref.current,
    documentTitle: "Resume",
    onAfterPrint: () => {
      alert("Resume Download Success.");
      navigate("/projects");
    },
  });
  return (
    <div className="w-max mx-auto">
      <DownloadButton handlePrint={handlePrint} navigate={navigate} />
      <div ref={template3Ref}>
        <section className="main-section">
          <div className="left-part">
            <div className="photo-container">
              <img src={state.image} alt="Image" />
            </div>
            <div className="contact-container">
              <h2 className="h2 title-t3">Contact Me</h2>
              <div className="contact-list">
                <div className="icon-container">
                  <i className="fa fa-globe w-[16px]" aria-hidden="true"></i>
                </div>
                <div className="contact-text">
                  <p>{state.address}, {state.country}</p>
                </div>
              </div>
              <div className="contact-list">
                <div className="icon-container">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </div>
                <div className="contact-text">
                  <p>{state.email}</p>
                </div>
              </div>
              <div className="contact-list">
                <div className="icon-container">
                  <i className="fa fa-phone w-[16px]" aria-hidden="true"></i>
                </div>
                <div className="contact-text">
                  <p>{state.phone}</p>
                </div>
              </div>
              {state.website !== "" && (
                <div className="contact-list">
                  <div className="icon-container">
                    <i className="fa fa-laptop" aria-hidden="true"></i>
                  </div>
                  <div className="contact-text">
                    <p>{state.website}</p>
                  </div>
                </div>
              )}
              {state.linkedIn !== "" && (
                <div className="contact-list">
                  <div className="icon-container">
                    <i className="fa fa-linkedin w-[17px]" aria-hidden="true"></i>
                  </div>
                  <div className="contact-text">
                    <p>{state.linkedIn}</p>
                  </div>
                </div>
              )}
            </div>
            {state.educations.length !== 0 && (
              <div className="education-container">
                <h2 className="h2 title-t3">Education</h2>
                {state.educations.map((education, index) => (
                  <EducationList key={index} education={education} />
                ))}
              </div>
            )}

            {state.skills.length !== 0 && (
              <div className="skills-container">
                <h2 className="h2 title-t3">Skills</h2>
                {state.skills.map((skill, index) => (
                  <SkillList key={index} skill={skill} />
                ))}
              </div>
            )}
          </div>
          <div className="right-part">
            <div className="banner">
              <h1 className="h1 firstname">{state.name.split(" ")[0]}</h1>
              <h1 className="h1 lastname">{state.name.split(" ").pop()}</h1>
              <p className="position">{state.job}</p>
            </div>

            {state.experiences.length !== 0 && (
              <div className="work-container ">
                <h2 className="h2 title-t3 text-left-t3">Work Experience</h2>
                {state.experiences.map((experience, index) => (
                  <ExperienceList key={index} experience={experience} />
                ))}
              </div>
            )}

            {state.languages.length !== 0 && (
              <div className="language-container">
                <h2 className="h2 title-t3 text-left-t3">LANGUAGES</h2>
                {state.languages.map((language, index) => (
                  <LanguageList key={index} language={language} />
                ))}
              </div>
            )}

            {state.interests.length !== 0 && (
              <div className="language-container">
                <h2 className="h2 title-t3 text-left-t3">Interest</h2>
                {state.interests.map((interest, index) => (
                  <InterestList key={index} interest={interest} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

const EducationList = ({ education }) => (
  <div className="course">
    <h2 className="h2 education-title">{education.degree}</h2>
    <h5 className="h5 college-name">{education.university}</h5>
    <p className="education-date">{`${education.startDegree} - ${education.endDegree}`}</p>
  </div>
);

const SkillList = ({ skill }) => (
  <div className="skill">
    <div className="left-skill">
      <p>{skill.skill}</p>
    </div>
    <div className="right-skill">
      <div className="outer-layer">
        <div className="inner-layer" style={{ width: `${skill.level}%` }}></div>
      </div>
    </div>
  </div>
);

const ExperienceList = ({ experience }) => (
  <div className="work">
    <div className="job-date">
      <p className="job">{experience.title}</p>
      <p className="date">{`${experience.startJob} - ${experience.endJob}`}</p>
    </div>
    <h2 className="h2 company-name">{experience.company}</h2>
    <p className="work-text">{experience.description}</p>
  </div>
);

const LanguageList = ({ language }) => (
  <div className="language">
    <div className="left-language">
      <p>{language.language}</p>
    </div>
    <div className="right-language">
      <div className="outer-layer">
        <div className="inner-layer" style={{ width: `${language.level}%` }}></div>
      </div>
    </div>
  </div>
);

const InterestList = ({ interest }) => (
  <div className="language">
    <div className="left-language">
      <p>{interest.topic}</p>
    </div>
    <div className="right-language">
      <div className="outer-layer">
        <div className="inner-layer" style={{ width: `${interest.level}%` }}></div>
      </div>
    </div>
  </div>
);

export default Template3;
