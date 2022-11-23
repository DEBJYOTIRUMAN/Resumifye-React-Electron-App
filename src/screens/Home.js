import React from "react";
import Sidebar from "../components/utility/Sidebar";
import MainContent from "../components/home/MainContent";

const style = {
  wrapper: `flex justify-center min-h-screen min-w-screen select-none text-white`,
  content: `flex flex-1 justify-between`,
};

const Home = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar initialSelectedIcon="Home" />
        <MainContent />
      </div>
    </div>
  );
};

export default Home;
