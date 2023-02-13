import React from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { apiUrl } from "../../api/constants";

import { updateCurrentUser } from "../../redux/userSlice";

import {
  BlackCloseIcon,
  StarCircleIcon,
  StarIcon,
  ArrowIcon,
} from "../../assets/icons";

import TtImage from "../../assets/images/tt.jpg";

const UserInteractionModal = ({
  user,
  setUser,
  setIsShowUserInteractionModal,
}) => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleFollowing = async (e) => {
    e.preventDefault();

    try {
      const unfollow = await axios.put(`${apiUrl}/user/unfollow/${user._id}`, {
        id: currentUser._id,
      });
      const userProfile = await axios.get(
        `${apiUrl}/user/get/${user.username}`
      );
      setUser(userProfile.data.user);
      setIsShowUserInteractionModal(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-coatingBgModal z-[1000]">
      <div className="w-full h-full flex items-center justify-center">
        <div className="max-h-[400px] w-[400px] bg-primaryBg rounded-xl overflow-hidden">
          <div className="flex flex-col justify-center relative">
            {/*  */}
            <div className="absolute top-0 right-0 px-2 py-1">
              <button
                onClick={() => setIsShowUserInteractionModal(false)}
                className="p-2"
              >
                <BlackCloseIcon />
              </button>
            </div>
            {/*  */}
            <div className="p-4 flex flex-col justify-center items-center">
              <span className="w-14 h-14">
                <img
                  src={user?.profilePicture}
                  className="w-full h-full object-cover object-center rounded-full"
                  alt=""
                />
              </span>
              <span className="mt-2 text-primaryText font-semibold text-sm">
                {user?.username}
              </span>
            </div>
            {/*  */}
            <hr className="w-full h-[1px] bg-separator" />
            {/*  */}
            <div className="w-full cursor-pointer hover:bg-secondaryBg">
              <div className="p-4 flex items-center">
                <div className="flex-1 text-primaryText font-normal text-sm">
                  Thêm vào danh sách bạn thân
                </div>
                <div className="ml-2">
                  <StarCircleIcon />
                </div>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="w-full cursor-pointer hover:bg-secondaryBg">
              <div className="p-4 flex items-center">
                <div className="flex-1 text-primaryText font-normal text-sm">
                  Thêm vào mục yêu thích
                </div>
                <div className="ml-2">
                  <StarIcon />
                </div>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="w-full cursor-pointer hover:bg-secondaryBg">
              <div className="p-4 flex items-center">
                <div className="flex-1 text-primaryText font-normal text-sm">
                  Cấm đăng
                </div>
                <div className="ml-2 rotate-90">
                  <ArrowIcon />
                </div>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="w-full cursor-pointer hover:bg-secondaryBg">
              <div className="p-4 flex items-center">
                <div className="flex-1 text-primaryText font-normal text-sm">
                  Hạn chế
                </div>
                <div className="ml-2 rotate-90">
                  <ArrowIcon />
                </div>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="w-full cursor-pointer hover:bg-secondaryBg">
              <div className="p-4 flex items-center">
                <button
                  onClick={handleFollowing}
                  className="flex-1 text-primaryText font-normal text-sm text-start"
                >
                  Bỏ theo giõi
                </button>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInteractionModal;
