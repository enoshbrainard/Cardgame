import React from "react";

function Card({ emoji, flipped, onClick }) {
  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">❓</div>
        <div className="card-back">{emoji}</div>
      </div>
    </div>
  );
}

export default Card;
