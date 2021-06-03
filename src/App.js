import React from "react";
//import HookForm from "./components/HookForm/HookForm";
//import BasicTable from "./components/ReactTable/BasicTable";
//import Signup from "./components/Signup/Signup";
//import BasicForm from "./components/BasicForm/BasicForm";
//import YupForm from "./components/YupForm/YupForm";
import FormikComponent from "./components/FormikComponent/FormikComponent";
//import Login from "./components/Login/Login";
import setAuthenticationToken from "./redux/action/setAuthenticationToken";
import store from "./redux/store";
import { setCurrentUser } from "./redux/action/userAction";
//import jwt_decode from "jwt-decode";
import jwtToken from "jsonwebtoken";
import Dashboard from "./components/Dashboard/Dashboard";
import { userLogout } from "./redux/action/userAction";
import FileUpload from "./components/image/FileUpload";
import DataShow from "./components/Data/DataShow";
import File from "./components/File";
import AddEvents from "./components/AddEvents/AddEvents";
function App() {
  //initial authentication with jwt
  // if (localStorage.jwtToken) {
  //   setAuthenticationToken(localStorage.jwtToken);
  //   store.dispatch(setCurrentUser(jwt_decode(localStorage.jwtToken)));
  // }

  //authentication with jwt expire or not
  if (localStorage.jwtToken) {
    setAuthenticationToken(localStorage.jwtToken);
    jwtToken.verify(localStorage.jwtToken, "secret", function (err, decode) {
      console.log("Decode", decode);
      if (err) {
        store.dispatch(userLogout());
      } else {
        console.log(decode);
        store.dispatch(setCurrentUser(decode));
      }
    });
  }

  return (
    <div>
      {/* <BasicForm /> */}
      {/* <YupForm /> */}
      {/* <FormikComponent /> */}
      {/* <HookForm /> */}
      {/* <BasicTable /> */}
      {/* <Signup /> */}
      {/* <Login /> */}
      {/* <Dashboard /> */}
      {/* <FileUpload /> */}
      {/* <DataShow /> */}
      {/* <File /> */}
      <AddEvents/>
    </div>
  );
}

export default App;
