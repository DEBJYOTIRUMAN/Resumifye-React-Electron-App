import React, { useContext, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineBell } from "react-icons/hi";
import avatar from "../../assets/user.png";
import SearchCard from "../utility/SearchCard";
import { ResumifyeContext } from "../../ResumifyeContext";
import { useNavigate } from "react-router-dom";
import { storeUser } from "../../storage";
import Dropdown from "./Dropdown";

const style = {
  wrapper: `flex-1`,
  searchBar: `flex items-center p-4 justify-between`,
  inputContainer: `bg-[#15202b] py-3.5 rounded-full hidden xl:flex xl:flex-1`,
  searchIcon: `text-[#8899a6] mx-2`,
  bellIcon: `hidden text-[#8899a6] ml-2 xl:block`,
  inputBox: `flex-1 bg-transparent outline-none`,
  rightIcons: "flex items-center",
  profileImage: `h-8 w-8 rounded-full object-cover ml-4 mr-2`,
};
const SearchBar = ({ headerTitle }) => {
  const [name, setName] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, setUser } = useContext(ResumifyeContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (name.length < 3) return;
    fetch(`https://resumifye.onrender.com/api/resume/search/${name}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((documents) => {
        setSearchList(documents);
      });
  }, [name]);

  const signOut = () => {
    setUser({});
    storeUser({});
    navigate("/");

  };
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.searchBar}>
          <div className="w-2/3 sm:text-3xl text-2xl mx-2 font-medium text-gray-100">
            {headerTitle}
          </div>
          <div className={style.inputContainer}>
            <BiSearch className={style.searchIcon} size={24} />
            <input
              placeholder="Search Resume"
              type="text"
              className={style.inputBox}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {name.length > 0 && (
              <div className="flex justify-center items-center">
                <AiOutlineClose
                className={style.searchIcon}
                onClick={() => {
                  setSearchList([]);
                  setName("");
                }}
              />
              </div>
            )}
          </div>
          <div className={style.rightIcons}>
            <HiOutlineBell className={style.bellIcon} size={24} onClick={() => navigate("/notifications")}/>
            <img
              src={avatar}
              alt="profile"
              className={style.profileImage}
              onClick={() => setShowDropdown(!showDropdown)}
            />
          </div>
        </div>
        {showDropdown ? <Dropdown user={user} signOut={signOut} navigate={navigate} /> : <></>}
        {searchList.length > 0 && name.length > 2 && (
          <div className="hidden xl:block">
            {searchList.map((project, index) => (
              <SearchCard key={index} project={project} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
