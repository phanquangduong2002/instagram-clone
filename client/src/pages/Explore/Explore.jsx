import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Error = () => {
  const [title, setTitle] = useState("Instagram");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return <div>Explore</div>;
};

export default Error;
