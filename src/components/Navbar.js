import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import loginService from "../service/login.service";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const closeModal = () => {
    setShowLogin(false);
  };

  const handleLogin = async (email, pass) => {
    const data = await loginService.signin();
    // console.log("Data : ", data.docs);
    const obj = data.docs.map((item) => ({ ...item.data(), id: item.id }));
    console.log(obj[0]);

    if (email == obj[0].email && pass == obj[0].password) {
      // alert("Login successfull");
      setIsLogin(true);
      closeModal();
    } else {
      // alert("login fail");
      setIsLogin(false);
    }
    // console.log("List : ", list);
  };
  const navigate = useNavigate();

  return (
    <div>
      <nav
        className="navbar box"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <div className="navbar-item" href="https://bulma.io">
            {/* <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            /> */}
            <h1 className="title" onClick={() => navigate("/")}>
              KKW Events
            </h1>
          </div>

          {/* <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a> */}
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <NavLink to="/" replace className="navbar-item">
              Home
            </NavLink>

            {isLogin && (
              <>
                <NavLink to="/about" className="navbar-item">
                  Form
                </NavLink>

                <NavLink to="/invite" className="navbar-item">
                  Invite
                </NavLink>
              </>
            )}
            {/* <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-Navlink">More</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            </div> */}
          </div>
          {/* <div className="navbar-center">
            <div className="navbar-item">
              <h1 className="title">KKW Events</h1>
            </div>
          </div> */}
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {/* <a className="button is-primary">
                <strong>Sign up</strong>
              </a> */}
                {/* <a className="button is-light">Log in</a> */}
                <p
                  onClick={() => {
                    isLogin ? setIsLogin(false) : setShowLogin(!showLogin);
                  }}
                  className="button is-light"
                >
                  {!isLogin ? "Login" : "Logout"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {showLogin && (
        <div className={`${showLogin ? "is-active" : ""} modal`}>
          <div className="modal-background" onClick={closeModal}></div>

          <div className="modal-content ">
            <Login
              onLogin={handleLogin}
              isLogin={isLogin}
              handleLogout={() => setIsLogin(false)}
            />
          </div>

          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
