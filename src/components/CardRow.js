import React, { useEffect, useState } from "react";
import eventsService from "../service/events.service";
import Card from "./Card";

const CardRow = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllEvents = async () => {
    setLoading(true);
    const data = await eventsService.getAllEvents();
    console.log("Data : ", data.docs);
    setList(data.docs.map((item) => ({ ...item.data(), id: item.id })));
    setLoading(false);
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="m-1 box">
      {/* <div className="is-flex-direction-row is-flex is-justify-content-space-between px-5">
        <h1 className="is-size-2 is-text has-text-left">MCA</h1>
        <h1 className="button  has-text-right">see more</h1>
      </div> */}

      {/* <div className="columns m-5">
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
     */}

      <div className="is-flex is-flex-wrap-wrap  is-justify-content-center">
        {/* <div className="cardItem">
          <Card />
        </div> */}
        {loading && (
          <progress className="progress is-small is-primary" max="100">
            15%
          </progress>
        )}
        {list.map((item, id) => {
          return (
            <div
              key={id + ""}
              className="cardItem"
              onClick={() => console.log(item)}
            >
              <Card item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardRow;
