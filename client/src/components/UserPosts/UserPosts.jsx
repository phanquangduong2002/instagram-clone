import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import PostModal from "../PostModal/PostModal";
import PostStorage from "../PostStorage/PostStorage";

const UserPosts = ({ posts, setPosts }) => {
  const [isShowPostModal, setIsShowPostModal] = useState(false);

  isShowPostModal
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "visible");

  return (
    <div className="w-full flex flex-wrap justify-center gap-7 relative">
      {posts &&
        posts.map((post) => (
          <div key={post._id}>
            <PostStorage post={post} setIsShowPostModal={setIsShowPostModal} />
          </div>
        ))}
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
