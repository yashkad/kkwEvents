import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deptEventList, instEventList } from "../../Data/data";
import Navbar from "../Navbar";
import styles from "./FirstPage.module.css";

const FirstPage = () => {
  const [showInstList, setShowInstList] = useState(false);
  const [showDeptList, setShowDeptList] = useState(false);

  const handleShow = (index) => {
    // alert(index);
    if (index == 1) {
      setShowDeptList(false);
      setShowInstList(true);
    }
    if (index == 2) {
      setShowInstList(false);
      setShowDeptList(true);
    }
    if (index == 3) {
      setShowDeptList(false);
      setShowInstList(false);
    }
  };

  return (
    <div>
      <div className={styles.HomeCSS}>
        <div className={styles.card}>
          <h2 className="subtitle is-3"> List of Event</h2>
          <h3
            onClick={() => handleShow(1)}
            className="is-size-5 button is-fullwidth is-info is-inverted"
          >
            {"Institute Level Event"}
          </h3>
          <h3
            onClick={() => {
              handleShow(2);
            }}
            className="is-size-5 button is-fullwidth is-info is-inverted"
          >
            {"Department Level Event"}
          </h3>
        </div>
        {showInstList && <InstituteList handleShow={handleShow} />}
        {showDeptList && <DepartmentList handleShow={handleShow} />}
      </div>
    </div>
  );
};

export default FirstPage;

const InstituteList = ({ handleShow }) => {
  return (
    <div className={[styles.instList]}>
      <div class="dropdown">
        <div id="dropdown-menu3" role="menu">
          <div class="dropdown-content">
            {instEventList.map((item, index) => {
              return (
                <Link
                  to={index == 1 ? "/eventPage" : "/404"}
                  className="dropdown-item"
                >
                  {item}
                </Link>
              );
            })}
            <hr className="dropdown-divider" />
            <h2
              className="dropdown-item button is-fullwidth is-danger is-inverted"
              onClick={() => handleShow(3)}
            >
              Close
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

const DepartmentList = ({ handleShow }) => (
  <div className={[styles.instList]}>
    <div className="dropdown">
      <div id="dropdown-menu3" role="menu">
        <div className="dropdown-content">
          {deptEventList["technical"].map((item, index) => {
            return (
              <Link
                to={index == 0 ? "/eventPage" : "/404"}
                className="dropdown-item"
              >
                {item}
              </Link>
            );
          })}
          <hr className="dropdown-divider" />

          {deptEventList["nonTechnical"].map((item, index) => {
            return (
              <Link to="/" className="dropdown-item">
                {item}
              </Link>
            );
          })}
          <hr className="dropdown-divider" />
          <h2
            className="dropdown-item button is-fullwidth is-danger is-inverted"
            onClick={() => handleShow(3)}
          >
            Close
          </h2>
        </div>
      </div>
    </div>
  </div>
);
