import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import UserProfile from "../UserProfile/UserProfile";
import Header from "./Header";

const Dashboard = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  // console.log(isLoggedIn);
  if (isLoggedIn === false) {
    var callContainer = (
      <>
        <Route exact path="/login" component={Login} />{" "}
        <Route path="/" component={Signup} />
      </>
    );
  } else {
    callContainer = (
      <>
        {/* <Header /> */}
        <Route exact path="/" component={Header} />
        <Route exact path="/userprofile" component={UserProfile} />
      </>
    );
  }

  return <Router>{callContainer}</Router>;
};

export default Dashboard;
