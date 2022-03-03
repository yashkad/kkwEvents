import React from "react";
import Card from "./Card";

const CardRow = () => {
  return (
    <div className="m-1 box">
      <div className="is-flex-direction-row is-flex is-justify-content-space-between px-5">
        <h1 className="is-size-2 is-text has-text-left">MCA</h1>
        <h1 className="button  has-text-right">see more</h1>
      </div>

      <div className="columns m-5">
        <div className="column">
          <Card />
        </div>
        <div className="column">
          <Card />
        </div>
        <div className="column">
          <Card />
        </div>
        <div className="column">
          <Card />
        </div>
        <div className="column">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default CardRow;
