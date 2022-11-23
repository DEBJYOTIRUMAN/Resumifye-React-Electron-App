import React from "react";
import { format } from "timeago.js";
import { AiOutlineCloudServer } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const style = {
  container: `flex justify-end px-4`,
  item: `w-[35%] flex items-center p-3 my-2 hover:bg-[#15202b] cursor-pointer rounded-full border-[#38444d] border-b`,
  followAvatar: `h-[40px] w-[40px] rounded-full object-cover`,
  profileDetails: `px-5`,
  name: `text-base font-semibold text-gray-200`,
  handle: `text-[#8899a6] font-normal`,
  iconContainer: `flex-1 flex items-center justify-end`,
  cloudIcon: `w-10 h-10 flex justify-center items-center rounded-full text-slate-600`,
  followButton: `bg-black text-gray-200 px-3 py-1 rounded-full text-xs font-bold ml-1`,
};
const SearchCard = ({ project }) => {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <div className={style.item} onClick={() => navigate("/resume", { state: project })}>
        <img src={project.image} alt="Avatar" className={style.followAvatar} />
        <div className={style.profileDetails}>
          <div className={style.name}>{project.projectName}</div>
          <div className={style.handle}>
            {format(new Date(project.updatedAt).getTime())}
          </div>
        </div>
        <div className={style.iconContainer}>
          <div className={style.cloudIcon}>
            <AiOutlineCloudServer size={24} />
          </div>
          <div>
            <div className={style.followButton}>Resume</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
