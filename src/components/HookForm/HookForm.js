import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HookForm.css";
const HookForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log("Form data ", data);
  };
  return (
    <div className="signup">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-center mt-3"> Create New Account</h3>
        <div className="form-group">
          <input
            name="name"
            ref={register({
              required: {
                value: true,
                message: "Name is required",
              },
              minLength: {
                value: 4,
                message: "Name field should have min length of 4",
              },
            })}
            className="form-control"
            placeholder="Enter Your Name"
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
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
            name="confirm_password"
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
          {errors.confirm_password && (
            <span className="error">{errors.confirm_password.message}</span>
          )}
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

export default HookForm;
