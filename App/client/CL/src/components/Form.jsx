import React from "react";
import InputList from "./InputList";

const Form = ({ CreateFunction, visibilityFunction, username }) => {
  return (
    <div className="form_div">
      <InputList
        username={username}
        CreateFunction={CreateFunction}
        visibilityFunction={visibilityFunction}
      ></InputList>
    </div>
  );
};

export default Form;
