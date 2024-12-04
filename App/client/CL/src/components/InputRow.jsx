import React from "react";

const InputRow = ({ index, onChange, part, price }) => {
  return (
    <div className="input_row_div">
      <input
        type="text"
        placeholder="Computer Part"
        value={part}
        onChange={(e) => onChange(index, "part", e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => onChange(index, "price", e.target.value)}
      />
    </div>
  );
};

export default InputRow;
