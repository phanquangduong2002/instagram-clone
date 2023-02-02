import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { apiUrl } from "../../api/constants";

import Post from "../Post/Post";

const TimelinePost = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [timeLinePosts, setTimeLinePosts] = useState(null);

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
            <Post post={post} setData={setTimeLinePosts} />
          </div>
        ))}
    </div>
  );
};

export default TimelinePost;
