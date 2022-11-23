import React, { useEffect, useContext, useState } from "react";
import SearchBar from "../home/SearchBar";
import { ResumifyeContext } from "../../ResumifyeContext";
import ProjectsTable from "./ProjectsTable";

const style = {
  wrapper: `flex-1 border-l border-[#38444d]`,
  container: `px-6 sm:px-10 lg:px-20`,
};
const ProjectsContent = () => {
  const { user } = useContext(ResumifyeContext);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      return;
    }
    fetch(`https://resumifye.onrender.com/api/resume/${user._id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((documents) => {
        setProjects(documents);
      });
  }, [user]);

  return (
    <div className={style.wrapper}>
      <SearchBar headerTitle="Projects" />
      <div className={style.container}>
        <p className="text-2xl font-medium text-gray-300 my-5">My Projects🛠️</p>
        <ProjectsTable projects={projects} setProjects={setProjects} />
      </div>
    </div>
  );
};

export default ProjectsContent;
