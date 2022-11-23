import React from "react";
import Sidebar from "../components/utility/Sidebar";
import ComingSoon from "../components/upcoming/ComingSoon";

const style = {
  wrapper: `flex justify-center min-h-screen min-w-screen select-none text-white`,
  content: `flex flex-1 justify-between`,
};

const Notifications = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar initialSelectedIcon="Notifications" />
        <ComingSoon />
      </div>
    </div>
  );
};

export default Notifications;
