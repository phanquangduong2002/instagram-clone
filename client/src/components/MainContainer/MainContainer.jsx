import React from "react";
import MainPosts from "../MainPosts/MainPosts";
import TimelineStory from "../TimelineStory/TimelineStory";

const MainContainer = () => {
  return (
    <div className="w-full mt-[60px] md:mt-0">
      <div className="max-w-[853px] mx-auto pt-1 flex">
        <div className="w-full max-w-[470px] mr-16">
          <div className="mt-8 py-4">
            <TimelineStory />
          </div>
          <div className="mt-4">
            <MainPosts />
          </div>
        </div>
        <div>Sidebar</div>
      </div>
    </div>
  );
};

export default MainContainer;
