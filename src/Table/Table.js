import { useReducer } from "react";
import "../TableRow/TableRow";
import TableRow from "../TableRow/TableRow";
import "./Table.scss";

export default function Table() {
  const tableData = [
    {
      name: "smss.exe",
      device: "Stark",
      path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
      status: "scheduled"
    },

    {
      name: "netsh.exe",
      device: "Targaryen",
      path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
      status: "available"
    },

    {
      name: "uxtheme.dll",
      device: "Lannister",
      path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
      status: "available"
    },

    {
      name: "cryptbase.dll",
      device: "Martell",
      path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
      status: "scheduled"
    },

    {
      name: "7za.exe",
      device: "Baratheon",
      path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
      status: "scheduled"
    }
  ];

  const reducer = (state, action) => {
    switch (action.type) {
      case "select":
        return state.map((row) => {
          if (row.name === action.name) {
            return { ...row, selected: !row.selected };
          } else {
            return row;
          }
        });
      default:
        return state;
    }
  };

  const transformedData = tableData.map((row) => {
    return { ...row, selected: false };
  });

  const handleToggleRowSelect = (fileName) => {
    dispatch({ type: "select", name: fileName });
  };

  const [tableRows, dispatch] = useReducer(reducer, transformedData);

  return (
    <table className="Table">
      <tbody>
        {tableRows.map((dataRow) => {
          return (
            <TableRow
              key={dataRow.name}
              data={dataRow}
              toggleRowSelect={handleToggleRowSelect}
            />
          );
        })}
      </tbody>
    </table>
  );
}
