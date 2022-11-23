import React from "react";
import Sidebar from "../components/utility/Sidebar";
import ProjectsContent from "../components/projects/ProjectsContent";

const style = {
  wrapper: `flex justify-center min-h-screen min-w-screen select-none text-white`,
  content: `flex flex-1 justify-between`,
  container: `flex-1 border-l border-[#38444d]`,
};
const Projects = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar initialSelectedIcon="Projects" />
        <ProjectsContent />
      </div>
    </div>
  );
};

export default Projects;
