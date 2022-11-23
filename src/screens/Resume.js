import React from "react";
import ResumeForm from "../components/resume/ResumeForm";
import Sidebar from "../components/utility/Sidebar";
import {useLocation} from 'react-router-dom';

const style = {
  wrapper: `flex justify-center min-h-screen min-w-screen select-none text-white`,
  content: `flex flex-1 justify-between`,
};
const Resume = () => {
  const { state } = useLocation();
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar initialSelectedIcon="Resume" />
        <ResumeForm project={state} />
      </div>
    </div>
  );
};

export default Resume;
