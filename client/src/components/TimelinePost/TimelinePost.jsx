import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiUrl } from "../../api/constants";

import Post from "../Post/Post";

const TimelinePost = () => {
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timelinePost = await axios.get(
          `${apiUrl}/posts/timeline/${currentUser._id}`
        );
        console.log(timelinePost.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchData();
  }, [currentUser._id]);

  return <div>TimelinePost</div>;
};

export default TimelinePost;
