import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import AvatarImage from "../../assets/images/avatar.jpg";
import {
  HomeIcon,
  HomeBorderIcon,
  SearchIcon,
  ExploreIcon,
  ExploreBorderIcon,
  MessageIcon,
  NotificationIcon,
  CreateIcon,
  SettingIcon,
  SettingActiveIcon,
} from "../../assets/images";

const Navbar = () => {
  const [openSetting, setOpenSetting] = useState(false);

  const handleSetting = () => {
    setOpenSetting(!openSetting);
  };

  const location = useLocation().pathname;
  return (
    <div className="fixed z-[1000] h-screen w-navMediumWidth border-r-[1px] border-separator">
      <div className="w-full h-full bg-primaryBg px-3 pt-2 pb-5 flex flex-col items-start">
        <div className="px-3 pt-6 pb-4">
          <Link to="/">
            <img
              className="w-120 object-cover"
              src="/Instagram-Logo-2010-2013.png"
              alt="Trang chủ"
            />
          </Link>
        </div>
        <div className="w-full">
          <Link to="/">
            <div className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out">
              <span>
                {!(
                  location.includes("explore") || location.includes("profile")
                ) ? (
                  <HomeIcon />
                ) : (
                  <HomeBorderIcon />
                )}
              </span>
              <span
                className={`pl-5 text-primaryText ${
                  !(
                    location.includes("explore") || location.includes("profile")
                  )
                    ? "font-semibold"
                    : "font-normal"
                }`}
              >
                Trang chủ
              </span>
            </div>
          </Link>
          <button className="w-full">
            <div className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out">
              <span>
                <SearchIcon />
              </span>
              <span className="font-normal pl-5 text-primaryText">
                Tìm kiếm
              </span>
            </div>
          </button>
          <Link to="/explore">
            <div className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out">
              <span>
                {location.includes("explore") ? (
                  <ExploreIcon />
                ) : (
                  <ExploreBorderIcon />
                )}
              </span>
              <span
                className={`pl-5 text-primaryText ${
                  location.includes("explore") ? "font-semibold" : "font-normal"
                }`}
              >
                Khám phá
              </span>
            </div>
          </Link>
          <button className="w-full">
            <div className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out">
              <span>
                <MessageIcon />
              </span>
              <span className="font-normal pl-5">Tin nhắn</span>
            </div>
          </button>
          <button className="w-full">
            <div className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out">
              <span>
                <NotificationIcon />
              </span>
              <span className="font-normal pl-5 text-primaryText">
                Thông báo
              </span>
            </div>
          </button>
          <button className="w-full">
            <div className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out">
              <span>
                <CreateIcon />
              </span>
              <span className="font-normal pl-5 text-primaryText">Tạo</span>
            </div>
          </button>
          <Link to="/profile/:username">
            <div className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out">
              <span>
                <img
                  src={AvatarImage}
                  className={`w-[26px] h-[26px] rounded-full border-[2px] ${
                    location.includes("profile")
                      ? "border-primaryText"
                      : "border-primaryBg"
                  }`}
                  alt=""
                />
              </span>
              <span
                className={`pl-5 text-primaryText ${
                  location.includes("profile") ? "font-semibold" : "font-normal"
                }`}
              >
                Trang cá nhân
              </span>
            </div>
          </Link>
        </div>
        <div className="w-full">
          <button onClick={handleSetting} className="w-full">
            <div className="w-full p-3 my-4 rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out">
              <span>
                {openSetting ? <SettingActiveIcon /> : <SettingIcon />}
              </span>
              <span
                className={`pl-5 text-primaryText ${
                  openSetting ? "font-semibold" : "font-normal"
                } `}
              >
                Xem thêm
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
