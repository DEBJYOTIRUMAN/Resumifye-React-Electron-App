import React from "react";
import SearchBar from "./SearchBar";
import HeroSection from "./HeroSection";

const style = {
  wrapper: `flex-1 border-l border-[#38444d]`,
};
const MainContent = () => {
  return (
    <div className={style.wrapper}>
      <SearchBar headerTitle="Dashboard" />
      <HeroSection />
    </div>
  );
};

export default MainContent;
