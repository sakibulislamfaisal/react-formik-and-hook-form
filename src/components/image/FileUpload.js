import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FileUpload.css";
import { useState } from "react";
const FileUpload = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [file, setFile] = useState(null);
  const password = useRef({});
  password.current = watch("password", "");
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  // console.log("file", file);
  const onSubmit = (data, e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", file);
    // formData.append("name", data.name);
    // formData.append("email", data.email);
    // formData.append("password", data.password);
    // formData.append("confirm_password", data.confirm_password);

    console.log("Form data ", formData);
    console.log(" data ", data);

    const url = "http://localhost:5200/api/user/signup";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
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
          <input type="file" name="file" onChange={handleChange} />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success btn-block sign-btn">
            <FontAwesomeIcon icon={faUserPlus} /> Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
