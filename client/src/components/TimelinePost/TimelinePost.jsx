import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

import { apiUrl } from "../../api/constants";

import Post from "../Post/Post";
import PostModal from "../PostModal/PostModal";
import CreatePostModal from "../CreatePostModal/CreatePostModal";

const TimelinePost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { isShowCreatePostModal } = useSelector((state) => state.post);

  const [timeLinePosts, setTimeLinePosts] = useState(null);
  const [isShowPostModal, setIsShowPostModal] = useState(false);

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
        {isShowCreatePostModal && (
          <CreatePostModal setPosts={setTimeLinePosts} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimelinePost;
