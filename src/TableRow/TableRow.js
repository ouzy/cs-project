import { useState, useEffect } from "react";
import "./TableRow.scss";

export default function TableRow({ data }) {
  const { name, device, path, status } = data;

  const [isSelected, setIsSelected] = useState(false);

  const handleRowToggle = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className="TableRow">
      <button className="TableRowButton" onClick={handleRowToggle}>
        <div className={`Checkbox ${isSelected ? "Checked" : ""}`}></div>
        <span>{name}</span>
        <span>{device}</span>
        <span>{path}</span>
        <span>{status}</span>
      </button>
    </div>
  );
}
