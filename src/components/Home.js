import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import CardRow from "./CardRow";
import Form from "./Form";
import Navbar from "./Navbar";
import FirebaseForm from "./FirebaseForm";
import EventDetails from "./EventDetails";
import FirstPage from "./FirstPage/FirstPage";
const Home = () => {
  return (
    <div className="main">
      {/* <Form /> */}
      {/* <EventDetails /> */}
      {/* <CardRow /> */}
      {/* <CardRow /> */}
      <FirstPage />
      {/* <FirebaseForm /> */}
    </div>
  );
};

export default Home;
