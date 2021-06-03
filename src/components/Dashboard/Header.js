import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/action/userAction";
// import { Link, Route } from "react-router-dom";
import { Link, Route } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
// import UserProfile from "../UserProfile/UserProfile";

const Header = () => {
  const userInfo = useSelector((state) => state.user.userInfo.email);
  const dispatch = useDispatch();

  const handleLogout = () => {
    userLogout(dispatch(userLogout()));
  };
  return (
    <div>
      <p>Email - {userInfo}</p>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title={userInfo} id="basic-nav-dropdown">
              <Link to="/userprofile" className="dropdown-item" role="button">
                View Profile
              </Link>
              <Link
                to="/"
                onClick={handleLogout}
                className="dropdown-item"
                role="button"
              >
                Logout
              </Link>
              {/* <button
                onClick={handleLogout}
                className="btn btn-danger text-light"
              >
                Logout
              </button> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
