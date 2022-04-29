import { useEffect, useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import "./TableRow.scss";

export default function TableRow({ data, toggleRowSelect }) {
  const { name, device, path, status, selected } = data;

  const [isSelected, setIsSelected] = useState(selected);

  const handleRowToggle = () => {
    setIsSelected(!isSelected);
    toggleRowSelect(name);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRowToggle();
    }
  };

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <tr
      className={`TableRow ${isSelected ? "Selected" : ""}`}
      onClick={handleRowToggle}
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <td>
        <Checkbox status={isSelected ? 2 : 0} />
      </td>
      <td>{name}</td>
      <td>{device}</td>
      <td>{path}</td>
      <td>{status[0].toUpperCase() + status.substring(1)}</td>
    </tr>
  );
}
