import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const closeModal = () => {
    setShowLogin(false);
  };

  return (
    <div>
      <nav
        className="navbar box"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <div class="navbar-item" href="https://bulma.io">
            {/* <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            /> */}
            <h1 className="title">KKW Events</h1>
          </div>

          {/* <a
            role="button"
            class="navbar-burger"
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
            <Link to="/" replace className="navbar-item">
              Home
            </Link>

            <Link to="/about" className="navbar-item">
              About
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            </div>
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
                  onClick={() => setShowLogin(!showLogin)}
                  className="button is-light"
                >
                  Log in
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
            <Login />
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
