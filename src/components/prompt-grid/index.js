import React from "react";
import "./prompt-grid.css";

const PromptGrid = ({ selection, removeCard }) => {
  return (
    <div className="prompt-grid">
      {selection.map((prompt, index) => (
        <div key={`prompt-${index}`} className={`card ${prompt.type}`}>
          <div
            className="remove-card"
            onClick={() => {
              removeCard(prompt);
            }}
          >
            <i className="fa fa-times"></i>
          </div>
          <div className="image">
            <img
              src={prompt.imageUrl ? prompt.imageUrl : "images/placeholder.png"}
              alt=""
            />
          </div>
          <div className="title">{prompt.description}</div>
          <div className="subtitle">{prompt.type}</div>
        </div>
      ))}
    </div>
  );
};

export default PromptGrid;
