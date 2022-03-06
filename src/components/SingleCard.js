import React from "react";

const SingleCard = () => {
  return (
    <div className="main">
      <section className="hero is-medium is-link">
        <div className="hero-body has-text-left">
          <div className="is-flex is-flex-direction-row  is-align-item-center">
            <div class="card-image" style={{ width: "15rem", height: "10rem" }}>
              <figure class="image">
                <img
                  src="https://bulma.io/images/placeholders/1280x960.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div>
              <p className="title">Medium hero</p>
              <p className="subtitle">Medium subtitle</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleCard;
