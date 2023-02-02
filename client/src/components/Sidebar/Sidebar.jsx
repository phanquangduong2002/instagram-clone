import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AvatarImage from "../../assets/images/avatar.jpg";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="pt-[30px] mt-[18px]">
      <div className="mt-4 mb-[10px]">
        <div className="flex items-center justify-between">
          <Link to={`profile/${currentUser.username}`}>
            <div className="w-14 h-14 mr-3 rounded-full overflow-hidden">
              <img
                src={AvatarImage}
                className="w-full h-full rounded-full object-cover object-center"
                alt="Avatar current user"
              />
            </div>
          </Link>
          <div className="flex flex-col ml-1 flex-1">
            <span className="">
              <Link
                to={`/profile/${currentUser.username}`}
                className="text-primaryText font-semibold text-xs"
              >
                {currentUser.username}
              </Link>
            </span>
            <span className="text-secondaryText font-normal text-sm">
              {currentUser.fullname}
            </span>
          </div>
          <div className="ml-2 text-xs font-semibold text-primaryButton hover:text-linkText">
            <button>Chuyển</button>
          </div>
        </div>
      </div>
      <div className="my-3 flex flex-col items-center justify-start">
        <div className="w-full py-2 flex items-center justify-between">
          <span className="flex-1 text-secondaryText font-medium text-sm">
            Gợi ý cho bạn
          </span>
          <button className="text-primaryText font-semibold text-xs">
            Xem tất cả
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
