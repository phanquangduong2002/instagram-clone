import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";

import AvatarImage from "../../assets/images/avatar.jpg";
import {
  InstagramText,
  InstagramIcon,
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
} from "../../assets/icons";

const Navbar = () => {
  const [openSetting, setOpenSetting] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const handleSetting = () => {
    setOpenSetting(!openSetting);
  };

  const location = useLocation().pathname;
  return (
    <>
      {/* Pc and taplet */}
      <div className="hidden md:flex fixed left-0 top-0 z-[1000] h-screen w-[72px] xl:w-[244px] border-r-[1px] border-separator">
        <div className="w-full h-full bg-primaryBg px-3 pt-2 pb-5 flex flex-col items-start">
          <div className="px-3 pt-6 pb-4">
            <Link to="/">
              <span className="hidden xl:flex">
                <InstagramText />
              </span>
              <span className="flex xl:hidden">
                <InstagramIcon />
              </span>
            </Link>
          </div>
          <div className="w-full">
            <Link to="/">
              <motion.div
                whileTap={{ opacity: 0.4 }}
                transition={{ duration: 0.1 }}
                className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
              >
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
                  className={`hidden xl:flex pl-5 text-primaryText ${
                    !(
                      location.includes("explore") ||
                      location.includes("profile")
                    )
                      ? "font-semibold"
                      : "font-normal"
                  }`}
                >
                  Trang chủ
                </span>
              </motion.div>
            </Link>
            <button className="w-full">
              <motion.div
                whileTap={{ opacity: 0.4 }}
                transition={{ duration: 0.1 }}
                className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
              >
                <span>
                  <SearchIcon />
                </span>
                <span className="hidden xl:flex font-normal pl-5 text-primaryText">
                  Tìm kiếm
                </span>
              </motion.div>
            </button>
            <Link to="/explore">
              <motion.div
                whileTap={{ opacity: 0.4 }}
                transition={{ duration: 0.1 }}
                className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
              >
                <span>
                  {location.includes("explore") ? (
                    <ExploreIcon />
                  ) : (
                    <ExploreBorderIcon />
                  )}
                </span>
                <span
                  className={`hidden xl:flex pl-5 text-primaryText ${
                    location.includes("explore")
                      ? "font-semibold"
                      : "font-normal"
                  }`}
                >
                  Khám phá
                </span>
              </motion.div>
            </Link>
            <button className="w-full">
              <motion.div
                whileTap={{ opacity: 0.4 }}
                transition={{ duration: 0.1 }}
                className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
              >
                <span>
                  <MessageIcon />
                </span>
                <span className="hidden xl:flex font-normal pl-5">
                  Tin nhắn
                </span>
              </motion.div>
            </button>
            <button className="w-full">
              <motion.div
                whileTap={{ opacity: 0.4 }}
                transition={{ duration: 0.1 }}
                className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
              >
                <span>
                  <NotificationIcon />
                </span>
                <span className="hidden xl:flex font-normal pl-5 text-primaryText">
                  Thông báo
                </span>
              </motion.div>
            </button>
            <button className="w-full">
              <motion.div
                whileTap={{ opacity: 0.4 }}
                transition={{ duration: 0.1 }}
                className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
              >
                <span>
                  <CreateIcon />
                </span>
                <span className="hidden xl:flex font-normal pl-5 text-primaryText">
                  Tạo
                </span>
              </motion.div>
            </button>
            <Link to={`/profile/${currentUser.username}`}>
              <motion.div
                whileTap={{ opacity: 0.4 }}
                transition={{ duration: 0.1 }}
                className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
              >
                <span>
                  <img
                    src={AvatarImage}
                    className={`w-[26px] h-[26px] rounded-full border-[2px] ${
                      location.includes(`profile/${currentUser.username}`)
                        ? "border-primaryText"
                        : "border-primaryBg"
                    }`}
                    alt=""
                  />
                </span>
                <span
                  className={`hidden xl:flex pl-5 text-primaryText ${
                    location.includes(`profile/${currentUser.username}`)
                      ? "font-semibold"
                      : "font-normal"
                  }`}
                >
                  Trang cá nhân
                </span>
              </motion.div>
            </Link>
          </div>
          <div className="w-full">
            <button onClick={handleSetting} className="w-full">
              <motion.div
                whileTap={{ opacity: 0.4 }}
                transition={{ duration: 0.1 }}
                className="w-full p-3 my-4 rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
              >
                <span>
                  {openSetting ? <SettingActiveIcon /> : <SettingIcon />}
                </span>
                <span
                  className={`hidden xl:flex pl-5 text-primaryText ${
                    openSetting ? "font-semibold" : "font-normal"
                  } `}
                >
                  Xem thêm
                </span>
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden fixed bottom-0 left-0 w-full border-t-[1px] border-separator">
        <div className="w-full px-4 flex justify-around items-center">
          <Link to="/">
            <motion.div
              whileTap={{ opacity: 0.4, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
            >
              {!(
                location.includes("explore") || location.includes("profile")
              ) ? (
                <HomeIcon />
              ) : (
                <HomeBorderIcon />
              )}
            </motion.div>
          </Link>
          <Link to="/explore">
            <motion.div
              whileTap={{ opacity: 0.4, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
            >
              {location.includes("explore") ? (
                <ExploreIcon />
              ) : (
                <ExploreBorderIcon />
              )}
            </motion.div>
          </Link>
          <button className="">
            <motion.div
              whileTap={{ opacity: 0.4, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
            >
              <CreateIcon />
            </motion.div>
          </button>
          <button className="">
            <motion.div
              whileTap={{ opacity: 0.4, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
            >
              <MessageIcon />
            </motion.div>
          </button>
          <Link to="/profile/:username">
            <motion.div
              whileTap={{ opacity: 0.4, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
            >
              <img
                src={AvatarImage}
                className={`w-[26px] h-[26px] rounded-full border-[2px] ${
                  location.includes("profile")
                    ? "border-primaryText"
                    : "border-primaryBg"
                }`}
                alt=""
              />
            </motion.div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
