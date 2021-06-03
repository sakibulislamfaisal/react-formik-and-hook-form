import { Formik, Field, Form, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";
import "./Login.css";
import TextError from "./Error";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/action/userAction";

// import { BrowserRouter as Router, Route } from "react-router-dom";
const Login = () => {
  const loginMessage = useSelector((state) => state.user.msg);
  // const passMsg = useSelector((state) => state.user.passMsg);
  // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userInfo = useSelector((state) => state.user.userInfo.username);
  // console.log(userInfo);

  //console.log(passMsg);
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values, onSubmitProp) => {
    loginUser(dispatch(loginUser(values)));

    //onSubmitProp.resetForm();
  };

  //yup work
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format!")
      .required("Email is Required!"),
    password: Yup.string()
      .required("Password is Required!")
      .min(5, "password at least 5 characters"),
  });

  return (
    <div>
      <h2 className="text-center">Login Panel</h2>
      <div className="text-center">{loginMessage}</div>
      <div className="text-center">{userInfo}</div>
      <br />
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
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

            <button type="submit" className="btn btn-secondary rounded mt-1">
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;

// const mapStateToProps = (state) => {
//   return {
//     userDetails: state.user.userDetails,
//     msg: state.user.msg,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     signupUser: function (data) {
//       dispatch(signupUser(data));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Signup);
