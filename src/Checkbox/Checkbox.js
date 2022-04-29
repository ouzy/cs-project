import { useState } from "react";
import "./Checkbox.scss";

export default function Checkbox({ status }) {
  const checkBoxState = {
    0: "Unchecked",
    1: "PartiallyChecked",
    2: "FullyChecked"
  };
  return <div className={`Checkbox ${checkBoxState[status]}`}></div>;
}
