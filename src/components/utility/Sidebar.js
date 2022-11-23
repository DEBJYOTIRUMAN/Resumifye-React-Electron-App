import { useContext, useState } from "react";
import SidebarOption from "./SidebarOption";
import { RiHome7Line, RiHome7Fill } from "react-icons/ri";
import { BsFilePdf } from "react-icons/bs";
import { FiBell } from "react-icons/fi";
import { IoDocumentTextOutline, IoDocumentText } from "react-icons/io5";
import { FaFilePdf, FaBell } from "react-icons/fa";
import { BsImageFill, BsImage } from "react-icons/bs";
import { GiJugglingSeal } from "react-icons/gi";
import avatar from "../../assets/user.png";
import { ResumifyeContext } from "../../ResumifyeContext";
import Dropdown from "../home/Dropdown";
import { storeUser } from "../../storage";
import { useNavigate } from "react-router-dom";

const style = {
  wrapper: `px-2 sm:px-4 xl:px-8 flex flex-col h-screen sticky top-0`,
  twitterIconContainer: `text-3xl m-2 sm:m-4`,
  navContainer: `flex-1`,
  profileButton: `items-center mb-6 cursor-pointer hover:bg-[#333c45] rounded-[100px] p-2 hidden xl:flex`,
  profileLeft: `flex item-center justify-center mr-4`,
  profileImage: `h-12 w-12 rounded-full object-cover`,
  profileRight: `flex-1 flex`,
  details: `flex-1`,
  name: `text-lg`,
};

const Sidebar = ({ initialSelectedIcon = "Home" }) => {
  const [selected, setSelected] = useState(initialSelectedIcon);
  const { user, setUser } = useContext(ResumifyeContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const signOut = () => {
    setUser({});
    storeUser({});
    navigate("/");

  };
  return (
      <div className={style.wrapper}>
        <div className={style.twitterIconContainer}>
          <GiJugglingSeal size={"1.6em"} onClick={() => navigate("/home")} />
        </div>
        <div className={style.navContainer}>
          <SidebarOption
            Icon={selected === "Home" ? RiHome7Fill : RiHome7Line}
            text="Home"
            isActive={Boolean(selected === "Home")}
            setSelected={setSelected}
            redirect="/home"
          />
          <SidebarOption
            Icon={selected === "Projects" ? FaFilePdf : BsFilePdf}
            text="Projects"
            isActive={Boolean(selected === "Projects")}
            setSelected={setSelected}
            redirect="/projects"
          />
          <SidebarOption
            Icon={selected === "Notifications" ? FaBell : FiBell}
            text="Notifications"
            isActive={Boolean(selected === "Notifications")}
            setSelected={setSelected}
            redirect="/notifications"
          />
          <SidebarOption
            Icon={selected === "Resume" ?  IoDocumentText : IoDocumentTextOutline }
            text="Resume"
            isActive={Boolean(selected === "Resume")}
            setSelected={setSelected}
            redirect="/resume"
          />
          <SidebarOption
            Icon={selected === "Resizer" ? BsImageFill : BsImage}
            text="Resizer"
            isActive={Boolean(selected === "Resizer")}
            setSelected={setSelected}
            redirect="/resizer"
          />
        </div>
        <div className="mb-4">
        {showDropdown ? (
          <Dropdown user={user} signOut={signOut} navigate={navigate} />
        ) : (
          <></>
        )}
        </div>
        <div
          className={style.profileButton}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className={style.profileLeft}>
            <img src={avatar} alt="Profile" className={style.profileImage} />
          </div>
          <div className={style.profileRight}>
            <div className={style.details}>
              <div className={style.name}>
                {user.firstName} {user.lastName}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Sidebar;
