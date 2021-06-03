import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import "./FormikComponent.css";
import TextError from "./TextError";

const FormikComponent = () => {
  const [success, setSuccess] = useState(false);
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values, onSubmitProp) => {
    const url = "http://localhost:5200/api/user/signup";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data), setSuccess(true));

    onSubmitProp.resetForm();
  };

  //yup work
  const validationSchema = Yup.object({
    username: Yup.string().required("username is Required!"),
    email: Yup.string()
      .email("Invalid Email Format!")
      .required("Email is Required!"),
    password: Yup.string()
      .required("Password is Required!")
      .min(5, "password at least 5 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "password must be matched")
      .required("Confirm Password is Required!"),
  });

  return (
    <div>
      <h2 className="text-center">Registration Form</h2>
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          <Form>
            <div className="form-group">
              <label htmlFor="name">username</label>
              <Field
                type="text"
                name="username"
                id="username"
                className="form-control"
              />
              <ErrorMessage name="username" component={TextError} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="text"
                name="email"
                id="email"
                className="form-control"
              />
              <ErrorMessage name="email" component={TextError} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                id="password"
                className="form-control"
              />
              <ErrorMessage name="password" component={TextError} />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">ConfirmPassword</label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="form-control"
              />
              <ErrorMessage name="confirmPassword" component={TextError} />
            </div>
            <button type="submit" className="btn btn-secondary rounded mt-1">
              Submit
            </button>
            {success && <p>success</p>}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default FormikComponent;
