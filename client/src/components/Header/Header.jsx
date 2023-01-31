import React from "react";
import { motion } from "framer-motion";
import {
  InstagramText,
  SearchInputIcon,
  NotificationIcon,
} from "../../assets/icons";

const Header = () => {
  return (
    <header className="flex md:hidden fixed top-0 left-0 w-full h-[60px] bg-primaryBg before:absolute before:w-full before:h-[1px] before:-bottom-[1px] before:left-0 before:right-0 before:bg-separator">
      <div className="w-full px-4 flex items-center justify-between">
        <h1>
          <InstagramText />
        </h1>
        <div className="flex items-center">
          <div className="px-4 relative">
            <input
              className="bg-highlightBg rounded-lg outline-none text-primaryText font-extralight py-[6px] pl-12 pr-5"
              autocapitalize="none"
              placeholder="Tìm kiếm"
              type="text"
              value=""
            />
            <span className="absolute left-8 top-1/2 -translate-y-1/2">
              <SearchInputIcon />
            </span>
          </div>
          <div>
            <button className="w-full">
              <motion.div
                whileTap={{ opacity: 0.4, scale: 0.9 }}
                transition={{ duration: 0.1 }}
                className="w-full p-1 rounded-full bg-primaryBg flex items-center hover:bg-secondaryBg transition-all duration-150 ease-in-out"
              >
                <NotificationIcon />
              </motion.div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
