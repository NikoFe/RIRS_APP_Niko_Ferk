import React from "react";
import InputRow from "./InputRow";
import { useEffect, useState } from "react";

/*<div className="input_list_div">
<button> Add </button>
<button>SUBMIT</button>
</div>*/

const InputList = ({ CreateFunction, visibilityFunction, username }) => {
  const [rows, setRows] = useState([{ part: "", price: "" }]);

  // const [inputRows, setInputRows] = useState([""]);

  const handleAddRow = () => {
    setRows([...rows, { part: "", price: "" }]);
  };

  const handleSubmit = () => {
    const isValid = rows.every((row) => row.part && row.price);
    if (!isValid) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const values = rows.map((row) => ({ part: row.part, price: row.price }));

    CreateFunction(username, "image_placeholder", values);

    visibilityFunction();
    // ()=>  CreateFunction()
  };

  const handleChange = (index, field, value) => {
    console.log("index:" + index + " field: " + field + " value: " + value);
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  return (
    <div>
      <h2>Computer Parts List</h2>
      {rows.map((row, index) => (
        <InputRow
          key={index}
          index={index}
          part={row.part}
          price={row.price}
          onChange={handleChange}
        />
      ))}
      <button onClick={handleAddRow} style={{ marginRight: "10px" }}>
        Add Row
      </button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default InputList;
