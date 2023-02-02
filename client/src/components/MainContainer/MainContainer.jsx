import React from "react";
import TimelinePost from "../TimelinePost/TimelinePost";
import TimelineStory from "../TimelineStory/TimelineStory";

import Sidebar from "../Sidebar/Sidebar";

const MainContainer = () => {
  return (
    <div className="w-full mt-[60px] md:mt-0">
      <div className="max-w-[875px] mx-auto pt-1 flex">
        <div className="w-full max-w-[500px] mr-16 bg-primaryBg">
          <div className="mt-8 py-4">
            <TimelineStory />
          </div>
          <div className="mt-4">
            <TimelinePost />
          </div>
        </div>
        <div className="w-full max-w-[319px]">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
