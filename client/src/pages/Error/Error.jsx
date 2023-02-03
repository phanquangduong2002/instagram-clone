import React, { useEffect, useState } from "react";

const Error = () => {
  const [title, setTitle] = useState("Instagram");

  useEffect(() => {
    document.title = title;
  }, [title]);

  return <div>Error</div>;
};

export default Error;
