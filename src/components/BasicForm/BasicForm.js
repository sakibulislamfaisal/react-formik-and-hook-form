import { useFormik } from "formik";
import React from "react";
import "./BasicForm.css";

const BasicForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values) => {
    console.log("Form Data", values);
  };
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Name is Required!";
    }
    if (!values.email) {
      errors.email = "Email is Required!";
    }
    if (!values.password) {
      errors.password = "Password is Required!";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "ConfirmPassword is Required!";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  // console.log("Form Data ", formik.values);
  // console.log("Form Errors ", formik.errors);
  console.log("Form visited ", formik.touched);

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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            values={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}

          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            values={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            values={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}

          <label htmlFor="confirmPassword">ConfirmPassword</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            values={formik.values.confirmPassword}
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

export default BasicForm;
