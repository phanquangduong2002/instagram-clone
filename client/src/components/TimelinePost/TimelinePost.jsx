import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

import { apiUrl } from "../../api/constants";

import Post from "../Post/Post";
import PostModal from "../PostModal/PostModal";

const TimelinePost = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [timeLinePosts, setTimeLinePosts] = useState(null);
  const [isShowPostModal, setIsShowPostModal] = useState(false);

  isShowPostModal
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "visible");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timeline = await axios.get(
          `${apiUrl}/posts/timeline/${currentUser._id}`
        );
        if (timeline.data.success) {
          setTimeLinePosts(timeline.data.posts);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchData();
  }, [currentUser._id]);

  return (
    <div className="mt-4">
      {timeLinePosts &&
        timeLinePosts.map((post) => (
          <div
            key={post._id}
            className="pb-[20px] mb-3 border-b-[1px] border-separator"
          >
            <Post
              post={post}
              setData={setTimeLinePosts}
              setIsShowPostModal={setIsShowPostModal}
            />
          </div>
        ))}
      <AnimatePresence>
        {isShowPostModal && (
          <PostModal
            setPosts={setTimeLinePosts}
            setIsShowPostModal={setIsShowPostModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimelinePost;
