import React, { useEffect } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import { apiUrl } from "../../api/constants";

const TimelineStory = () => {
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (error) {}
    };
  });

  return <div>TimelineStory</div>;
};

export default TimelineStory;
