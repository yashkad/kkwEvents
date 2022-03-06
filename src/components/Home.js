import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import CardRow from "./CardRow";
import Form from "./Form";
import Navbar from "./Navbar";
import SingleCard from "./SingleCard";
import FirebaseForm from './FirebaseForm'
const Home = () => {
  return (
    <div className="main">
      {/* <Form /> */}
      {/* <SingleCard /> */}
     {/* <CardRow />
     <CardRow />
     <CardRow /> */}
     <FirebaseForm />
    </div>
  );
};

export default Home;
