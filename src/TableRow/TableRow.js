import { useState } from "react";
import "./TableRow.scss";

export default function TableRow({ data, toggleRowSelect }) {
  const { name, device, path, status } = data;

  const [isSelected, setIsSelected] = useState(false);

  const handleRowToggle = () => {
    setIsSelected(!isSelected);
    toggleRowSelect(name);
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
      tabIndex="0"
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
