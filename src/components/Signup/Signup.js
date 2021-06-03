import { Formik, Field, Form, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";
import "./Signup.css";
import TextError from "./Error";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/action/userAction";

const Signup = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const userMessage = useSelector((state) => state.user.msg);

  console.log(userDetails);
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  };

  const onSubmit = (values, onSubmitProp) => {
    const { username, email, password, confirmPassword, image } = values;
    console.log("image value is ", image);
    // signupUser(dispatch(signupUser(values)));
    // console.log({
    //   fileName: values.file.name,
    //   type: values.file.type,
    //   size: `${values.file.size} bytes`,
    // });
    // console.log(values.image.name);
    // console.log(values.file);

    //let data = new FormData();

    // values.append("username", values.username);
    // values.append("email", values.email);
    // values.append("password", values.password);
    // values.append("confirmPassword", values.confirmPassword);
    // data.append("image", values.image);
    // data.append("photo", values.image);
    // console.log("data value", values);
    // const img = JSON.stringify(values.file);
    // console.log("image value", img);

    let formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image.name);

    console.log(formData);
    signupUser(dispatch(signupUser(values)));

    // onSubmitProp.resetForm();
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
      <div className="text-center">{userMessage}</div>
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formProps) => (
            <Form encType="multipart/form-data">
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

              <div className="form-group">
                <input
                  multiple
                  accept="image/*"
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={(event) => {
                    formProps.setFieldValue(
                      "image",
                      event.currentTarget.files[0]
                    );
                  }}
                />
              </div>
              <button type="submit" className="btn btn-secondary rounded mt-1">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;

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
