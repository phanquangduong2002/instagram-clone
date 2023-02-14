import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setShowCreatePostModal } from "../../redux/postSlice";

import PostModal from "../PostModal/PostModal";
import PostStorage from "../PostStorage/PostStorage";
import CreatePostModal from "../CreatePostModal/CreatePostModal";

import { CameraIcon } from "../../assets/icons";
import { AnimatePresence } from "framer-motion";

const UserPosts = ({ user, posts, setIsShowPostModal, setPosts }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { isShowCreatePostModal } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  return (
    <>
      <div className="w-full flex flex-wrap justify-center gap-7 relative">
        {posts && posts.length >= 1 ? (
          posts.map((post) => (
            <div key={post._id}>
              <PostStorage
                post={post}
                setIsShowPostModal={setIsShowPostModal}
              />
            </div>
          ))
        ) : (
          <div className="my-[60px] mx-11 max-w-[350px] flex flex-col justify-center">
            {/* 1 */}
            <div className="flex items-center justify-center">
              {user?._id === currentUser._id ? (
                <button
                  onClick={() => dispatch(setShowCreatePostModal(true))}
                  className="w-16 h-16 flex items-center justify-center rounded-full border-[1.5px] border-primaryText"
                >
                  <CameraIcon />
                </button>
              ) : (
                <div className="w-16 h-16 flex items-center justify-center rounded-full border-[1.5px] border-primaryText">
                  <CameraIcon />
                </div>
              )}
            </div>
            {/* 2 */}
            <div className="my-6">
              {user?._id === currentUser?._id ? (
                <h2 className="text-3xl font-extrabold text-primaryText text-center">
                  Chia sẻ ảnh
                </h2>
              ) : (
                <h2 className="text-3xl font-extrabold text-primaryText text-center">
                  Chưa có bài viết
                </h2>
              )}
            </div>
            {user?._id === currentUser?._id && (
              <>
                {/* 3 */}
                <div className="mb-6">
                  <p className="text-primaryText text-sm font-normal text-center">
                    Khi bạn chia sẻ ảnh, ảnh sẽ xuất hiện trên trang cá nhân của
                    bạn.
                  </p>
                </div>
                {/* 4 */}
                <div className="flex items-center justify-center">
                  <button className="text-primaryButton hover:text-linkText text-sm font-medium text-center">
                    Chia sẻ ảnh đầu tiên của bạn
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <AnimatePresence>
        {isShowCreatePostModal && <CreatePostModal setPosts={setPosts} />}
      </AnimatePresence>
    </>
  );
};

export default UserPosts;
