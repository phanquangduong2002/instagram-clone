import React from "react";
import { Navigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import MainContainer from "../../components/MainContainer/MainContainer";

import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) return <Navigate to="/accounts/login" />;

  return (
    <div className="ml-0 md:ml-[72px] xl:ml-[244px]">
      <Header />
      <MainContainer />
    </div>
  );
};

export default Home;
