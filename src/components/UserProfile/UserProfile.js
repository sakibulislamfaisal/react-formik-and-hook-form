// // import React from "react";
// // import { Container, Row, Col, Form, Button } from "react-bootstrap";
// // import { connect } from "react-redux";
// // import DefaultUserPic from "../../uploads/team-male.jpg";

// import React, { useEffect } from "react";
// import { useState } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import DefaultUserPic from "../../uploads/team-male.jpg";
// const axios = require("axios");
// const UserProfile = () => {
//   const [uploadImage, setUploadImage] = useState(null);
//   //const userInfo = useSelector((state) => state.user.userInfo);
//   // const username = useSelector((state) => state.user.userInfo.username);
//   //const email = useSelector((state) => state.user.userInfo.email);
//   //console.log(username);

//   // console.log(userInfo);
//   const userId = useSelector((state) => state.user.userInfo.userId);
//   console.log(userId);
//   const profileImage = useSelector((state) => state.user.profileImage);
//   const [username, setName] = useState(null);
//   const [email, setEmail] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5200/api/user/" + userId, {
//         headers: {
//           "content-type": "application/json",
//         },
//       })
//       .then((res) => {
//         console.log(res.data.result.email);
//         console.log(res.data.result.username);
//         setEmail(res.data.result.email);
//         setName(res.data.result.username);
//       })
//       .catch((err) => console.log(err));
//   }, [userId]);

//   if (profileImage) {
//     var profilePic = profileImage;
//   } else {
//     profilePic = DefaultUserPic;
//   }

//   const handleImageChange = (e) => {
//     console.log(e.target.files[0]);
//     setUploadImage(e.target.files[0]);
//   };

//   // const handleInputChangeName = (e) => {
//   //   // console.log(e.target.value);
//   //   setName(e.target.value);
//   // };
//   // const handleInputChangeEmail = (e) => {
//   //   setEmail(e.target.value);
//   // };

//   const handleUpdateProfile = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("profileImage", uploadImage);
//     formData.append("userId", userId);

//     //update-profile

//     //update-profile
//     axios
//       .post("http://localhost:5200/api/user/update-profile", formData, {
//         headers: {
//           "content-type": "application/json",
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div>
//       <Container>
//         <Row>
//           <Col>
//             <img src={profilePic} alt="profile pic" width="100" />
//           </Col>
//           <Col>
//             <h1>User Profile</h1>
//             <Form className="form">
//               <Form.Group controlId="formCategory1">
//                 <Form.Label>Username</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="username"
//                   defaultValue={username}
//                   // onChange={handleInputChangeName}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formCategory2">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   name="email"
//                   type="email"
//                   defaultValue={email}
//                   // onChange={handleInputChangeEmail}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formCategory4">
//                 <Form.Label>Profile Image</Form.Label>
//                 <Form.Control
//                   type="file"
//                   name="profileImage"
//                   onChange={handleImageChange}
//                 />
//               </Form.Group>
//               <Button variant="primary" onClick={handleUpdateProfile}>
//                 Update Profile
//               </Button>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default UserProfile;

import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import DefaultUserPic from "../../uploads/team-male.jpg";
const axios = require("axios");

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      username: this.props.username,
      email: this.props.email,
      profileImage: this.props.profileImage,
      msg: this.props.msg,
      uploadedFile: null,
    };
  }

  fetchUserDetails = (user_id) => {
    //console.log(user_id);
    axios
      .get("http://localhost:5200/api/user/" + user_id, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        // this.setState({email:res.data.results[0].email});
        // this.setState({profileImage:res.data.results[0].profileImage})
      })
      .catch((err) => console.log(err));
  };

  changeProfileImage = (event) => {
    this.setState({ uploadedFile: event.target.files[0] });
  };

  UpdateProfileHandler = (e) => {
    e.preventDefault();
    //create object of form data
    const formData = new FormData();
    formData.append("profileImage", this.state.uploadedFile);
    formData.append("user_id", this.state.user_id);

    //update-profile
    axios
      .post("http://localhost:5200/api/user/update-profile/", formData, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        //  this.setState({msg:res.data.message});
        //  this.setState({profileImage:res.data.results.profileImage});
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchUserDetails(this.state.user_id);
  }

  render() {
    if (this.state.profileImage) {
      var imagestr = this.state.profileImage;
      imagestr = imagestr.replace("public/", "");
      var profilePic = "http://localhost:5000/" + imagestr;
      var profilePic = this.state.profileImage;
    } else {
      profilePic = DefaultUserPic;
    }

    return (
      <Container>
        <Row>
          <Col>
            <img src={profilePic} alt="profils pic" width="100" />
          </Col>
          <Col>
            <h1>User Profile</h1>
            <Form className="form">
              <p>{this.state.msg}</p>
              <Form.Group controlId="formCategory1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" defaultValue={this.state.username} />
              </Form.Group>
              <Form.Group controlId="formCategory2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" defaultValue={this.state.email} />
              </Form.Group>

              <Form.Group controlId="formCategory4">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control
                  type="file"
                  name="profileImage"
                  onChange={this.changeProfileImage}
                />
              </Form.Group>
              <Button variant="primary" onClick={this.UpdateProfileHandler}>
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.user.userInfo.userId,
    username: state.user.userInfo.username,
    email: state.user.userInfo.email,
    profileImage: state.user.profileImage,
    msg: state.user.msg,
  };
};

export default connect(mapStateToProps)(UserProfile);
