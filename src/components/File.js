// import React from "react";
// import { useState } from "react";
// const axios = require("axios");

// const File = () => {
//   const [file, setFile] = useState(null);
//   const handleInputChange = (e) => {
//     setFile(e.target.files[0]);
//     console.log(e.target.files[0]);
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("image", file);

//     axios
//       .post("http://localhost:4000/single", data, {
//         headers: {
//           "content-type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => console.log(err));
//   };
//   //   fetch("http://localhost:4000/single", {
//   //     method: "POST",
//   //     body: data,
//   //   }).then((result) => {
//   //     console.log(result);
//   //     alert("file sent successfully");
//   //   });
//   // };
//   return (
//     <div>
//       <h1>React file upload</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="file" name="image" onChange={handleInputChange} />
//         <button type="submit">submit</button>
//       </form>
//     </div>
//   );
// };

// export default File;

import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
const File = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [file, setFile] = useState(null);
  const password = useRef({});
  password.current = watch("password", "");
  const handleChange = (e) => {
    setFile(e.target.files[0].name);
  };
  console.log("file", file);
  const onSubmit = (data, e) => {
    console.log(data);
    e.preventDefault();
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("image", file);

    // console.log("Form data ", formData);
    // console.log(" data ", data);

    const url = "http://localhost:5200/api/user/signup";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div className="signup">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-center mt-3"> Create New Account</h3>
        <div className="form-group">
          <input
            name="username"
            ref={register({
              required: {
                value: true,
                message: "username is required",
              },
              minLength: {
                value: 4,
                message: "Name field should have min length of 4",
              },
            })}
            className="form-control"
            placeholder="Enter Your Name"
          />
          {errors.username && (
            <span className="error">{errors.username.message}</span>
          )}
        </div>
        <div className="form-group">
          <input
            name="email"
            ref={register({
              required: "Enter your E-mail",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Enter a valid E-mail address",
              },
            })}
            className="form-control"
            placeholder="Email"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            ref={register({
              minLength: {
                value: 6,
                message: "password must have min length of 6",
              },
              required: {
                value: true,
                message: "You must specify a password",
              },
              maxLength: {
                value: 15,
                message: "password must have max length of 15",
              },
            })}
            className="form-control"
            placeholder=" Password"
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            ref={register({
              required: {
                value: true,
                message: "confirm password is required",
              },
              validate: (value) =>
                value === password.current || "The password do not match",
            })}
            className="form-control"
            placeholder=" Confirm Password"
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
        </div>
        <br />
        <div className="form-group text-center">
          <input type="file" name="image" onChange={handleChange} />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success btn-block sign-btn">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default File;
