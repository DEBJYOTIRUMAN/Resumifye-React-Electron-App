import React from "react";
import { BsTrash } from "react-icons/bs";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";

const ResumeCard = ({ project, deleteProject, index }) => {
  const navigate = useNavigate();
  return (
    <tr
      className="border-gray-700 hover:bg-[#22303c]"
      onClick={() => navigate("/resume", { state: project })}
    >
      <th
        scope="row"
        className="flex items-center py-4 sm:px-6 whitespace-nowrap text-white"
      >
        <img
          className="w-10 h-10 rounded-full object-cover hidden sm:inline-block"
          src={project.image}
          alt="Avatar"
        />
        <div className="pl-3">
          <div className="text-sm sm:text-base font-semibold">{project.projectName}</div>
          <div className="text-xs sm:text-sm font-normal text-gray-500">{project.email}</div>
        </div>
      </th>
      <td className="py-4 px-6 hidden lg:table-cell">{project.job}</td>
      <td className="py-4 px-6 hidden md:table-cell">
        <div className="flex items-center">
          {format(new Date(project.updatedAt).getTime())}
        </div>
      </td>
      <td className="py-4 sm:px-6">
        <div className="flex justify-center">
          <div
            className="w-9 h-9 flex justify-center items-center rounded-full hover:bg-slate-800 text-rose-600"
            onClick={() => deleteProject(project._id, index)}
          >
            <BsTrash size={20} />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ResumeCard;
