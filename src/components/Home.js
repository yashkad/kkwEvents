import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import CardRow from "./CardRow";
import Form from "./Form";
import Navbar from "./Navbar";
const Home = () => {
  return (
    <div className="main">
      {/* <Form /> */}
     <CardRow />
     <CardRow />
     <CardRow />
    </div>
  );
};

export default Home;
