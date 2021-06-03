import setAuthenticationToken from "./setAuthenticationToken";
import {
  SIGNUP_USER,
  LOGIN_USER,
  SET_CURRENT_USER,
  LOGOUT_USER,
} from "./userType";
import jwtDecode from "jwt-decode";
const axios = require("axios");

export const signupUser = (data) => {
  console.log("signup data ", data);
  const file = data.image;

  return function (dispatch) {
    const OPTIONS = {
      url: "http://localhost:5200/api/user/signup/",
      data,
      file,
      method: "POST",
      headers: new Headers({
        "Content-type": "multipart/form-data",
      }),
    };

    axios(OPTIONS)
      .then((res) => {
        console.log(res);
        const message = res.data.message;
        //console.log(message);
        dispatch({
          type: SIGNUP_USER,
          payload: message,
        });
      })
      .catch((err) => console.log(err));
  };
};

// export const signupUser = (data) => {
//   console.log("signup data ", data);
//   return function (dispatch) {
//     // const OPTIONS = {
//     //   url: "http://localhost:5200/api/user/signup/",
//     //   data,
//     //   method: "POST",

//     //   headers: new Headers({
//     //     "Content-type": "multipart/form-data",
//     //     Accept: "application/json",
//     //   }),
//     // };

//     fetch("http://localhost:5200/api/user/signup/", {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result);
//         const message = result.message;
//         //console.log(message);
//         dispatch({
//           type: SIGNUP_USER,
//           payload: message,
//         });
//       })
//       .catch((err) => console.log(err));
//   };
// };
//login user

export const loginUser = (data) => {
  console.log(data);
  return function (dispatch) {
    var OPTIONS = {
      url: "http://localhost:5200/api/user/login",
      method: "POST",
      data,
      headers: {
        "content-type": "application/json",
      },
    };

    axios(OPTIONS)
      .then((res) => {
        const message = res.data.message;
        const passMsg = res.data.passMsg;
        // console.log(passMsg);
        if (passMsg === "Password does not match") {
          dispatch({
            type: LOGIN_USER,
            payload: passMsg,
            isLoggedIn: false,
          });
        } else if (message === "Login is successful!") {
          const token = res.data.access_token;
          localStorage.setItem("jwtToken", token);
          // console.log({ token });
          setAuthenticationToken(token);
          console.log(jwtDecode(token, { body: true }));
          dispatch(setCurrentUser(jwtDecode(token)));

          dispatch({
            type: LOGIN_USER,
            payload: message,
            isLoggedIn: true,
          });
        } else {
          dispatch({
            type: LOGIN_USER,
            payload: message,
            isLoggedIn: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

//authentication methods
export const setCurrentUser = (user) => {
  // console.log("user", { user });
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

//user logout
export const userLogout = () => {
  return function (dispatch) {
    localStorage.removeItem("jwtToken");
    setAuthenticationToken(false);
    dispatch(setCurrentUser({}));

    dispatch({
      type: LOGOUT_USER,
    });
    window.location.href = "/";
  };
};
