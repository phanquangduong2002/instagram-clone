import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { findPost } from "../../redux/postSlice";

import {
  TurnAroundIcon,
  WhiteHeartIcon,
  WhiteCommentIcon,
} from "../../assets/icons";

import TtImages from "../../assets/images/tt.jpg";

const PostStorage = ({ post, setIsShowPostModal }) => {
  const dispatch = useDispatch();

  const handlePostModal = () => {
    dispatch(findPost(post));
    setIsShowPostModal(true);
  };
  return (
    <div className="w-[293px] h-[293px] relative group">
      <button onClick={handlePostModal} className="w-full h-full">
        <div className="w-full h-full">
          <img
            src={TtImages}
            className="w-full h-full object-cover object-center"
            alt=""
          />
        </div>
        <div className="absolute w-full h-full top-0 left-0">
          <span className="absolute top-0 right-0 m-2">
            <TurnAroundIcon />
          </span>
        </div>
        <div className="absolute w-full h-full top-0 left-0 z-50 hidden group-hover:flex items-center justify-center bg-coatingBg gap-4">
          <div className="flex items-center justify-center">
            <WhiteHeartIcon />
            <span className="px-2 text-white text-xl font-semibold flex items-center justify-center">
              {post.likes.length >= 1000
                ? post.likes.length / 1000
                : post.likes.length}
              {post.likes.length >= 1000 && (
                <p className="text-lg font-semibold mt-[1px] pl-[6px]">N</p>
              )}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <WhiteCommentIcon />
            <span className="px-2 text-white text-xl font-semibold">
              {post.comments.length}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default PostStorage;
