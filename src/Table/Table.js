import { useReducer, useEffect, useCallback, useState } from "react";
import TableRow from "../TableRow/TableRow";
import Checkbox from "../Checkbox/Checkbox";
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
      case "selectAll":
        return state.map((row) => {
          return { ...row, selected: true };
        });
      case "deselectAll":
        return state.map((row) => {
          return { ...row, selected: false };
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

  const updateCountText = useCallback((numOfSelectedRows) => {
    if (numOfSelectedRows > 0) {
      setCountText(`Selected ${numOfSelectedRows}`);
    } else {
      setCountText("None Selected");
    }
  }, []);

  const handleTableCheckboxClick = () => {
    const numChecked = tableRows.filter((row) => row.selected).length;
    const numElements = tableRows.length;

    if (numChecked === numElements) {
      dispatch({ type: "deselectAll" });
    } else {
      dispatch({ type: "selectAll" });
    }
  };

  const handleDownload = () => {
    const availableForDownload = tableRows.filter(
      (row) => row.status === "available" && row.selected
    );

    alert(
      availableForDownload.map((row) => {
        return `${row.path} ${row.device}`;
      })
    );
  };

  const [countText, setCountText] = useState("None Selected");
  const [tableRows, dispatch] = useReducer(reducer, transformedData);
  const [tableCheckboxStatus, setTableCheckboxStatus] = useState(0);

  useEffect(() => {
    const numChecked = tableRows.filter((row) => row.selected).length;
    const numElements = tableRows.length;

    if (numElements === numChecked) {
      setTableCheckboxStatus(2);
    } else if (numChecked > 0) {
      setTableCheckboxStatus(1);
    } else {
      setTableCheckboxStatus(0);
    }
    updateCountText(numChecked);
  }, [tableRows, updateCountText]);

  return (
    <>
      <div className="TableControls">
        <button className="CheckboxButton" onClick={handleTableCheckboxClick}>
          <Checkbox status={tableCheckboxStatus} />
        </button>
        <span>{countText}</span>
        <button className="DownloadButton" onClick={handleDownload}>
          Download Selected
        </button>
      </div>
      <table className="Table">
        <thead>
          <tr>
            <th></th>
            {Object.keys(tableData[0]).map((name) => {
              return (
                <th key={name}>{name[0].toUpperCase() + name.substring(1)}</th>
              );
            })}
          </tr>
        </thead>
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
    </>
  );
}
