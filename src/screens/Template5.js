import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import DownloadButton from "../components/templates/DownloadButton";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import "../template.css";

const Template5 = () => {
  const navigate = useNavigate();
  window.onpopstate = ()=> {
    navigate("/projects");
  };
  const { state } = useLocation();
  const template5Ref = useRef();
  const handlePrint = useReactToPrint({
    content: () => template5Ref.current,
    documentTitle: "Resume",
    onAfterPrint: () => {
      alert("Resume Download Success.");
      navigate("/projects");
    },
  });
  return (
    <div className="w-max mx-auto">
      <DownloadButton handlePrint={handlePrint} navigate={navigate} />
      <div className="body-t5" ref={template5Ref}>
        <div className="main-t5">
          <div className="left-t5">
            <br />
            <div className="profile-img-t5">
              <img src={state.image} alt="Image" />
            </div>

            <div className="box-1-t5">
              <div className="heading-t5">
                <p>CONTACT</p>
              </div>
              <p className="p1-t5">
                <i className="material-icons icons1-t5">call</i>
                {state.phone}
              </p>
              <p className="p1-t5">
                <i className="material-icons icons1-t5">email</i>
                {state.email}
              </p>
            </div>
            <br />

            {state.languages.length !== 0 && (
              <div className="box-1-t5">
                <div className="heading-t5">
                  <p>LANGUAGES</p>
                </div>
                {state.languages.map((language, index) => (
                  <LanguageList key={index} language={language} />
                ))}
              </div>
            )}
            <br />

            {state.skills.length !== 0 && (
              <div className="box-1-t5">
                <div className="heading-t5">
                  <p>SKILLS</p>
                </div>

                {state.skills.map((skill, index) => (
                  <SkillList key={index} skill={skill} />
                ))}
              </div>
            )}
            <br />
            {state.interests.length !== 0 && (
              <div className="box-1-t5">
                <div className="heading-t5">
                  <p>HOBBIES</p>
                </div>
                {state.interests.map((interest, index) => (
                  <InterestList key={index} interest={interest} />
                ))}
              </div>
            )}
          </div>

          <div className="right-t5">
            <div className="name-div-t5">
              <h1 className="h1 uppercase">{state.name}</h1>
              <p className="uppercase">{state.job}</p>
            </div>

            <div className="box-2-t5">
              <h2 className="h2 h2-t5">
                ABOUT ME{" "}
                <i
                  className="material-icons icons3-t5"
                  style={{ fontSize: "28px" }}
                >
                  perm_identity
                </i>
              </h2>
              <p className="p2-t5">{state.message}</p>
            </div>

            {state.educations.length !== 0 && (
              <div className="box-2-t5">
                <h2 className="h2 h2-t5">
                  EDUCATION <i className="material-icons icons3-t5">border_color</i>
                </h2>
                {state.educations.map((education, index) => (
                  <EducationList key={index} education={education} />
                ))}
              </div>
            )}

            {state.experiences.length !== 0 && (
              <div className="box-2-t5">
                <h2 className="h2 h2-t5">
                  WORK EXPERIENCE <i className="material-icons icons3-t5">folder</i>
                </h2>
                {state.experiences.map((experience, index) => (
                  <ExperienceList key={index} experience={experience} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LanguageList = ({ language }) => (

  <div className="p1-t5">
    {language.language}
    <div className="skill-container-t5">
      <div
        className="skill-t5 slider-t5"
        style={{ "--level": `${language.level}%` }}
      ></div>
    </div>
  </div>
);

const SkillList = ({ skill }) => (
  <div className="p1-t5">
    {skill.skill}
    <div className="skill-container-t5">
      <div
        className="skill-t5 slider-t5"
        style={{ "--level": `${skill.level}%` }}
      ></div>
    </div>
  </div>
);

const InterestList = ({ interest }) => (
  <div className="p1-t5">
    {interest.topic}
    <div className="skill-container-t5">
      <div
        className="skill-t5 slider-t5"
        style={{ "--level": `${interest.level}%` }}
      ></div>
    </div>
  </div>
);

const EducationList = ({ education }) => (
  <>
    <p className="p3-t5">
      {`${education.startDegree} - ${education.endDegree}`}{" "}
      <span>{education.degree}</span>
    </p>
    <p className="p2-t5">
      Completed {education.degree} at {education.university}.
    </p>
  </>
);

const ExperienceList = ({ experience }) => (
  <>
    <p className="p3-t5">
      {`${experience.startJob} - ${experience.endJob}`}{" "}
      <span>
        {experience.title} at {experience.company}
      </span>
    </p>
    <p className="p2-t5">{experience.description}</p>
  </>
);

export default Template5;
