import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import PostModal from "../PostModal/PostModal";
import PostStorage from "../PostStorage/PostStorage";

import { CameraIcon } from "../../assets/icons";

const UserPosts = ({ posts, setPosts }) => {
  const [isShowPostModal, setIsShowPostModal] = useState(false);

  isShowPostModal
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "visible");

  return (
    <div className="w-full flex flex-wrap justify-center gap-7 relative">
      {posts && posts.length >= 1 ? (
        posts.map((post) => (
          <div key={post._id}>
            <PostStorage post={post} setIsShowPostModal={setIsShowPostModal} />
          </div>
        ))
      ) : (
        <div className="my-[60px] mx-11 max-w-[350px] flex flex-col justify-center">
          {/* 1 */}
          <div className="flex items-center justify-center">
            <button className="w-16 h-16 flex items-center justify-center rounded-full border-[1.5px] border-primaryText">
              <CameraIcon />
            </button>
          </div>
          {/* 2 */}
          <div className="my-6">
            <h2 className="text-3xl font-extrabold text-primaryText text-center">
              Chia sẻ ảnh
            </h2>
          </div>
          {/* 3 */}
          <div className="mb-6">
            <p className="text-primaryText text-sm font-normal text-center">
              Khi bạn chia sẻ ảnh, ảnh sẽ xuất hiện trên trang cá nhân của bạn.
            </p>
          </div>
          {/* 4 */}
          <div className="flex items-center justify-center">
            <button className="text-primaryButton hover:text-linkText text-sm font-medium text-center">
              Chia sẻ ảnh đầu tiên của bạn
            </button>
          </div>
        </div>
      )}
      <AnimatePresence>
        {isShowPostModal && (
          <PostModal
            setPosts={setPosts}
            setIsShowPostModal={setIsShowPostModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserPosts;
