import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import "./YupForm.css";

const YupForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values) => {
    console.log("Form Data", values);
  };

  //yup work
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is Required!"),
    email: Yup.string()
      .email("Invalid Email Format!")
      .required("Email is Required!"),
    password: Yup.string().required("Password is Required!"),
    confirmPassword: Yup.string().required("Confirm Password is Required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      <h3>Registration Form</h3>
      <div className="form-container">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}

          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}

          <label htmlFor="confirmPassword">ConfirmPassword</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error">{formik.errors.confirmPassword}</div>
          ) : null}

          <button type="submit" className="btn btn-secondary rounded mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default YupForm;
