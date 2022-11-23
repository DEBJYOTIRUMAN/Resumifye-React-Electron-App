import React, { useRef } from "react";
import location from "../assets/location.png";
import call from "../assets/call.png";
import mail from "../assets/mail.png";
import domain from "../assets/domain.png";
import linkedin from "../assets/linkedin.png";
import userIcon from "../assets/user-icon.png";
import pencil from "../assets/pencil.png";
import edu from "../assets/edu.png";
import hobbies from "../assets/hobbies.png";
import { useLocation } from "react-router-dom";
import DownloadButton from "../components/templates/DownloadButton";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import "../template.css";

const Template4 = () => {
  const navigate = useNavigate();
  window.onpopstate = ()=> {
    navigate("/projects");
  };
  const { state } = useLocation();
  const template4Ref = useRef();
  const handlePrint = useReactToPrint({
    content: () => template4Ref.current,
    documentTitle: "Resume",
    onAfterPrint: () => {
      alert("Resume Download Success.");
      navigate("/projects");
    },
  });
  return (
    <div className="w-max mx-auto">
      <DownloadButton handlePrint={handlePrint} navigate={navigate} />
      <div className="body-t4" ref={template4Ref}>
        <div className="resume-box-t4">
          <div className="left-section-t4">
            <div className="profile-t4">
              <img src={state.image} className="profile-img-t4" alt="Image" />
              <div className="blue-box-t4"></div>
            </div>
            <h2 className="h2 name-t4">
              {state.name.split(" ")[0]} <br />{" "}
              <span>{state.name.split(" ").pop()}</span>
            </h2>
            <p className="job-t4">{state.job}</p>

            <div className="info-t4">
              <p className="heading-t4">Info</p>
              <p className="p1-t4">
                <span className="span1-t4">
                  <img src={location} alt="Location" />
                </span>
                {state.address}
                <span>
                  <br />
                  {state.country}
                </span>
              </p>
              <p className="p1-t4">
                <span className="span1-t4">
                  <img src={call} alt="Call" />
                </span>
                Phone
                <span>
                  <br />
                  {state.phone}
                </span>
              </p>
              <p className="p1-t4">
                <span className="span1-t4">
                  <img src={mail} alt="Mail" />
                </span>
                Email
                <span>
                  <br />
                  {state.email}
                </span>
              </p>
              {state.website !== "" && (
                <p className="p1-t4">
                  <span className="span1-t4">
                    <img src={domain} alt="Domain" />
                  </span>
                  Website
                  <span>
                    <br />
                    {state.website}
                  </span>
                </p>
              )}
            </div>
            {state.linkedIn !== "" && (
              <p className="p1-t4">
                <span className="span1-t4">
                  <img src={linkedin} alt="Linkedin" />
                </span>
                Linkdin
                <span>
                  <br />
                  {state.linkedIn}
                </span>
              </p>
            )}

            {state.languages.length !== 0 && (
              <div className="info-t4">
                <p className="heading-t4">Language</p>
                {state.languages.map((language, index) => (
                  <LanguageList key={index} language={language} />
                ))}
              </div>
            )}
          </div>

          <div className="right-section-t4">
            <div className="right-heading-t4">
              <img src={userIcon} alt="User" />
              <p className="p2-t4">Profile</p>
            </div>
            <p className="p3-t4">{state.message}</p>
            <div className="clearfix"></div>
            <br />
            <br />

            {state.experiences.length !== 0 && (
              <>
                <div className="right-heading-t4">
                  <img src={pencil} alt="Work" />
                  <p className="p2-t4">Work Experience</p>
                </div>
                <div className="clearfix"></div>
                {state.experiences.map((experience, index) => (
                  <ExperienceList key={index} experience={experience} />
                ))}
              </>
            )}

            {state.educations.length !== 0 && (
              <>
                <div className="right-heading-t4">
                  <img src={edu} alt="Education" />
                  <p className="p2-t4">Education</p>
                </div>
                <div className="clearfix"></div>
                {state.educations.map((education, index) => (
                  <EducationList key={index} education={education} />
                ))}
              </>
            )}

            {state.skills.length !== 0 && (
              <>
                <div className="right-heading-t4">
                  <img src={edu} alt="Skill" />
                  <p className="p2-t4">Skill and Expertize</p>
                </div>
                <div className="clearfix"></div>
                {state.skills.map((skill, index) => (
                  <SkillList key={index} skill={skill} />
                ))}
              </>
            )}

            <div className="clearfix"></div>
            <br />
            {state.interests.length !== 0 && (
              <>
                <div className="right-heading-t4">
                  <img src={hobbies} alt="Hobby" />
                  <p className="p2-t4">Hobby & Interest</p>
                </div>
                <div className="clearfix"></div>
                  {state.interests.map((interest, index) => (
                    <InterestList key={index} interest={interest} />
                  ))}
              </>
            )}
            <div className="clearfix"></div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  );
};

const LanguageList = ({ language }) => (
  <div className="p1-t4">
    <p className="p6-t4">{language.language}</p>
    <div id="progress1-t4" style={{ "--level": `${language.level}%` }}></div>
  </div>
);

const ExperienceList = ({ experience }) => (
  <div className="lr-box-t4">
    <div className="left-t4">
      <p className="p4-t4">{`${experience.startJob} - ${experience.endJob}`}</p>
      <p className="p5-t4">
        {experience.endJob - experience.startJob} Year Experience
      </p>
    </div>
    <div className="right-t4">
      <p className="p4-t4">{experience.title}</p>
      <p className="p5-t4">{experience.company}</p>
      <p className="p5-t4">{experience.description}</p>
    </div>
    <div className="clearfix"></div>
  </div>
);

const EducationList = ({ education }) => (
  <div className="lr-box-t4">
    <div className="left-t4">
      <p className="p4-t4">{`${education.startDegree} - ${education.endDegree}`}</p>
      <p className="p5-t4">
        {education.endDegree - education.startDegree} Year Duration
      </p>
    </div>
    <div className="right-t4">
      <p className="p4-t4">{education.degree}</p>
      <p className="p5-t4">{education.university}</p>
      <p className="p5-t4">
        Completed {education.degree} at {education.university}.
      </p>
    </div>
    <div className="clearfix"></div>
  </div>
);

const SkillList = ({ skill }) => (
  <div className="s-box-t4">
    <p className="p6-t4">{skill.skill}</p>
    <div id="progress-t4" style={{ "--level": `${skill.level}%` }}></div>
  </div>
);

const InterestList = ({ interest }) => (
  <div className="s-box-t4">
    <p className="p6-t4">{interest.topic}</p>
    <div id="progress-t4" style={{ "--level": `${interest.level}%` }}></div>
  </div>
);

export default Template4;
