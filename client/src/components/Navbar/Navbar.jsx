import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { AnimatePresence, motion } from "framer-motion";

import CreatePostModal from "../CreatePostModal/CreatePostModal";

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
  SearchInputIcon,
  CloseInputIcon,
} from "../../assets/icons";

const Navbar = () => {
  const [openSetting, setOpenSetting] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [isShowCreatePostModal, setIsShowCreatePostModal] = useState(false);
  const [valueInput, setValueInput] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  const handleSetting = () => {
    setOpenSetting(!openSetting);
  };

  const location = useLocation().pathname;
  return (
    <div className="relative">
      {/* Pc and taplet */}
      <motion.div
        animate={{ width: openSearch ? 76 : 244 }}
        transition={{ duration: 0.3 }}
        className="flex fixed left-0 top-0 z-[1000] h-screen border-r-[1px] border-separator"
      >
        <div className="w-full h-full bg-primaryBg px-3 pt-2 pb-5 flex flex-col items-start">
          <div className="px-3 pt-6 pb-4 min-h-[70px] relative">
            <Link to="/">
              {!openSearch && (
                <motion.span
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex absolute"
                >
                  <InstagramText />
                </motion.span>
              )}
              {openSearch && (
                <motion.span
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex absolute"
                >
                  <InstagramIcon />
                </motion.span>
              )}
            </Link>
          </div>
          <div className="w-full">
            <Link to="/">
              <motion.div
                whileTap={{ opacity: 0.4 }}
                transition={{ duration: 0.1 }}
                className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out relative"
              >
                <span>
                  {!(
                    location.includes("explore") ||
                    location.includes("profile") ||
                    location.includes("edit")
                  ) ? (
                    <HomeIcon />
                  ) : (
                    <HomeBorderIcon />
                  )}
                </span>
                {!openSearch && (
                  <motion.span
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`w-[150px] hidden xl:flex flex-1 absolute left-14 text-primaryText ${
                      !(
                        location.includes("explore") ||
                        location.includes("profile") ||
                        location.includes("edit")
                      )
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    Trang chủ
                  </motion.span>
                )}
              </motion.div>
            </Link>
            <button
              onClick={() => setOpenSearch(!openSearch)}
              className="w-full"
            >
              <motion.div
                whileTap={{ opacity: 0.4 }}
                transition={{ duration: 0.1 }}
                className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out relative"
              >
                <span>
                  <SearchIcon />
                </span>
                {!openSearch && (
                  <motion.span
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-[150px] hidden xl:flex flex-1 font-normal absolute left-14 text-primaryText"
                  >
                    Tìm kiếm
                  </motion.span>
                )}
              </motion.div>
            </button>
            <Link to="/explore">
              <motion.div
                whileTap={{ opacity: 0.4 }}
                transition={{ duration: 0.1 }}
                className="w-full p-3 my-[2px] rounded-full relative bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
              >
                <span>
                  {location.includes("explore") ? (
                    <ExploreIcon />
                  ) : (
                    <ExploreBorderIcon />
                  )}
                </span>
                {!openSearch && (
                  <motion.span
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`w-[150px] hidden xl:flex flex-1 absolute left-14 text-primaryText ${
                      location.includes("explore")
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    Khám phá
                  </motion.span>
                )}
              </motion.div>
            </Link>
            <button className="w-full">
              <motion.div
                whileTap={{ opacity: 0.4 }}
                transition={{ duration: 0.1 }}
                className="w-full p-3 my-[2px] rounded-full relative bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
              >
                <span>
                  <MessageIcon />
                </span>
                {!openSearch && (
                  <motion.span
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-[150px] hidden xl:flex flex-1 font-normal absolute left-14"
                  >
                    Tin nhắn
                  </motion.span>
                )}
              </motion.div>
            </button>
            <button className="w-full">
              <motion.div
                whileTap={{ opacity: 0.4 }}
                transition={{ duration: 0.1 }}
                className="w-full p-3 my-[2px] rounded-full relative bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
              >
                <span>
                  <NotificationIcon />
                </span>
                {!openSearch && (
                  <motion.span
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-[150px] hidden xl:flex flex-1 font-normal absolute left-14 text-primaryText"
                  >
                    Thông báo
                  </motion.span>
                )}
              </motion.div>
            </button>
            <button
              onClick={() => setIsShowCreatePostModal(true)}
              className="w-full"
            >
              <motion.div
                whileTap={{ opacity: 0.4 }}
                transition={{ duration: 0.1 }}
                className="w-full p-3 my-[2px] rounded-full relative bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
              >
                <span>
                  <CreateIcon />
                </span>
                {!openSearch && (
                  <motion.span
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-[150px] hidden xl:flex flex-1 font-normal absolute left-14 text-primaryText"
                  >
                    Tạo
                  </motion.span>
                )}
              </motion.div>
            </button>
            <Link to={`/profile/${currentUser?.username}`}>
              <motion.div
                whileTap={{ opacity: 0.4 }}
                transition={{ duration: 0.1 }}
                className="w-full p-3 my-[2px] rounded-full relative bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
              >
                <span>
                  <img
                    src={currentUser?.profilePicture}
                    className={`w-[26px] h-[26px] rounded-full border-[2px] ${
                      location.includes(`profile/${currentUser?.username}`)
                        ? "border-primaryText"
                        : "border-primaryBg"
                    }`}
                    alt=""
                  />
                </span>
                {!openSearch && (
                  <motion.span
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`w-[150px] hidden xl:flex flex-1 absolute left-14 text-primaryText ${
                      location.includes(`profile/${currentUser?.username}`)
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    Trang cá nhân
                  </motion.span>
                )}
              </motion.div>
            </Link>
          </div>
          <div className="w-full">
            <button onClick={handleSetting} className="w-full">
              <motion.div
                whileTap={{ opacity: 0.4 }}
                transition={{ duration: 0.1 }}
                className="w-full p-3 my-4 rounded-full relative bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
              >
                <span>
                  {openSetting ? <SettingActiveIcon /> : <SettingIcon />}
                </span>
                {!openSearch && (
                  <motion.span
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`w-[150px] hidden xl:flex flex-1 absolute left-14 text-primaryText ${
                      openSetting ? "font-semibold" : "font-normal"
                    } `}
                  >
                    Xem thêm
                  </motion.span>
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {openSearch && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 400 }}
            exit={{ width: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-[76px] h-screen py-2 border-r-[1px] border-separator rounded-tr-xl rounded-br-xl drop-shadow-[4px_0_24px_rgba(0,0,0,0.15)] bg-primaryBg"
          >
            <div className="w-full h-full flex flex-col">
              <div className="w-full flex flex-col">
                <div className="my-2 pt-3 px-6 pb-9">
                  <h2 className="text-primaryText font-medium text-2xl">
                    Tìm kiếm
                  </h2>
                </div>
              </div>

              <div className="w-full flex-1 flex flex-col">
                <div className="mx-4">
                  <div className="w-full mb-6 relative">
                    <input
                      type="text"
                      value={valueInput}
                      onChange={(e) => setValueInput(e.target.value)}
                      placeholder="Tìm kiếm"
                      className="w-full px-4 py-2 bg-highlightBg rounded-lg outline-none text-primaryText tex-sm font-normal placeholder:text-secondaryText placeholder:font-light placeholder:text-sm"
                    />
                    <button
                      onClick={() => setValueInput("")}
                      className="absolute top-1/2 -translate-y-1/2 p-2 right-2 cursor-pointer"
                    >
                      <CloseInputIcon />
                    </button>
                  </div>
                </div>

                <div className="flex-1 border-t-[1px] border-separator pt-3">
                  <div className="h-full flex flex-col">
                    <div className="mt-[6px] mx-6 mb-2">
                      <h4 className="text-primaryText font-medium text-base">
                        Gần đây
                      </h4>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                      <p className="text-secondaryText font-medium text-sm">
                        Không có nội dung tìm kiếm mới đây.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                location.includes("explore") ||
                location.includes("profile") ||
                location.includes("edit")
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
          <Link to={`/profile/${currentUser?.username}`}>
            <motion.div
              whileTap={{ opacity: 0.4, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="w-full p-3 my-[2px] rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
            >
              <img
                src={currentUser?.profilePicture}
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
      <AnimatePresence>
        {isShowCreatePostModal && (
          <CreatePostModal
            setIsShowCreatePostModal={setIsShowCreatePostModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
