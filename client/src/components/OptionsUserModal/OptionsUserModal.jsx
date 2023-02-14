import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../api/constants";
const OptionsUserModal = ({ setIsShowOptionsUserModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch(logout());
    navigate("/accounts/login");
  };

  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-coatingBgModal z-[2000]">
      <motion.div className="my-auto mx-20 w-[400px] bg-primaryBg rounded-xl overflow-hidden">
        <div className="w-full flex flex-col">
          <button className="p-3 border-t-[1px] border-separator text-sm text-primaryText font-normal hover:bg-secondaryButton">
            Thông báo
          </button>
          <button className="p-3 border-t-[1px] border-separator text-sm text-primaryText font-normal hover:bg-secondaryButton">
            Mã QR
          </button>
          <button className="p-3 border-t-[1px] border-separator text-sm text-primaryText font-normal hover:bg-secondaryButton">
            Quyền riêng tư
          </button>
          <button className="p-3 border-t-[1px] border-separator text-sm text-primaryText font-normal hover:bg-secondaryButton">
            Giám sát
          </button>
          <button className="p-3 border-t-[1px] border-separator text-sm text-primaryText font-normal hover:bg-secondaryButton">
            Báo cáo sự cố
          </button>
          <button
            onClick={handleLogout}
            className="p-3 border-t-[1px] border-separator text-sm text-primaryText font-normal hover:bg-secondaryButton"
          >
            Đăng xuất
          </button>
          <button
            onClick={() => setIsShowOptionsUserModal(false)}
            className="p-3 border-t-[1px] border-separator text-sm text-primaryText font-normal hover:bg-secondaryButton"
          >
            Hủy
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OptionsUserModal;
