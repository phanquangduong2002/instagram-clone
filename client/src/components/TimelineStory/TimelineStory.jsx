import React, { useEffect } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import { apiUrl } from "../../api/constants";

import AvatarImage from "../../assets/images/avatar.jpg";
import TtImage from "../../assets/images/tt.jpg";

const TimelineStory = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex items-center gap-x-[2px]">
      <div className="flex w-20">
        <button
          onClick={(e) => e.preventDefault()}
          className="flex flex-col w-full justify-center items-center"
        >
          <span className="w-16 h-16 mt-1 mb-2 p-[2px] rounded-full border-[1px] border-separator overflow-hidden">
            <img
              src={currentUser?.profilePicture}
              className="w-full h-full rounded-full object-cover object-center"
              alt=""
            />
          </span>
          <span className="w-full px-[2px] text-xs text-secondaryText font-normal truncate">
            {currentUser?.username}
          </span>
        </button>
      </div>
      {currentUser.following.map((followerUser) => (
        <div key={followerUser?._id} className="flex w-20">
          <button
            onClick={(e) => e.preventDefault()}
            className="flex flex-col w-full justify-center items-center"
          >
            <span className="w-16 h-16 mt-1 mb-2 p-[2px] rounded-full border-[1px] border-separator overflow-hidden">
              <img
                src={followerUser?.profilePicture}
                className="w-full h-full rounded-full object-cover object-center"
                alt=""
              />
            </span>
            <span className="w-full px-[2px] text-xs text-secondaryText font-normal truncate">
              {followerUser?.username}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default TimelineStory;
