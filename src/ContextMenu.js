import React from "react";
import "./ContextMenu.css";

const ContextMenu = ({ position, onOptionSelected }) => {
  const handleOptionSelected = option => () => onOptionSelected(option);

  return (
    <div
      className="menu"
      style={{
        position: "absolute",
        left: position.x,
        top: position.y
      }}
    >
      <ul>
        <li onClick={handleOptionSelected("option1")}>Add</li>
        <li onClick={handleOptionSelected("option2")}>Delete</li>
      </ul>
    </div>
  );
};

export default ContextMenu;
