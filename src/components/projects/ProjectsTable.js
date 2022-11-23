import React from "react";
import ResumeCard from "./ResumeCard";

const ProjectsTable = ({ projects, setProjects }) => {
  const deleteProject = (id, index) => {
    const copyProjects = [...projects];
    fetch(`https://resumifye.onrender.com/api/resume/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setProjects(copyProjects.filter((item, i) => i !== index));
      });
  };
  return projects.length > 0 ? (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 bg-[#15202b] dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-3 sm:px-6">
              Project Name
            </th>
            <th scope="col" className="py-3 px-6 hidden lg:table-cell">
              Job Title
            </th>
            <th scope="col" className="py-3 px-6 hidden md:table-cell">
              Last Updated
            </th>
            <th scope="col" className="py-3 px-6">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <ResumeCard
              project={project}
              key={index}
              deleteProject={deleteProject}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="flex justify-center items-center py-40 text-2xl text-gray-400">
      <span>No Projects Found!🙅‍♂️</span>
    </div>
  );
};

export default ProjectsTable;
