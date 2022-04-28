import { useState, useEffect } from "react";
import "./TableRow.scss";

export default function TableRow({ data }) {
  const { name, device, path, status } = data;

  const [isSelected, setIsSelected] = useState(false);

  const handleRowToggle = () => {
    setIsSelected(!isSelected);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRowToggle();
    }
  };

  return (
    <tr
      className="TableRow"
      onClick={handleRowToggle}
      tabindex="0"
      onKeyDown={handleKeyDown}
    >
      <td className={`Checkbox ${isSelected ? "Checked" : ""}`}></td>
      <td>{name}</td>
      <td>{device}</td>
      <td>{path}</td>
      <td>{status}</td>
    </tr>
  );
}
