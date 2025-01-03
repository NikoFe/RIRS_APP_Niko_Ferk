import React, { useEffect, useState } from "react";
import axios from "axios";

const SignIn = ({ addUser, signFunction, setName }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (value) => {
    setUsername(value);
  };
  const onPasswordChange = (value) => {
    setPassword(value);
  };

  const validate_sign_in = async (usr, pss) => {
    console.log("CHECKING SIGN IN");
    try {
      //const response = await axios.get("http://localhost:5000/sign_in");

      console.log("VALIDATE :" + "USERNAME: " + usr + " PASSWORD: " + pss);
      const response = await axios.post("http://localhost:5000/sign_in", {
        username: usr,
        password: pss,
      });
      console.log("LENGTH--------------: ", response);

      //setEntries((entries) => [...entries, response.data]);

      if (response.rowCount == 1) {
        return true;
      } else {
        return false;
      }
      // console.log("ENTRIES: ", entries);
    } catch (error) {
      console.error("Error fetching entries", error);
    }
  };

  const validate = async () => {
    if (username != "" && password != "") {
      console.log("USERNAME: " + username + " PASSWORD: " + password);

      setName(username);

      const valid = await validate_sign_in(username, password);
      console.log("VALID? : ", valid);
      if (valid) {
        signFunction();
      }
    }
    return;
  };

  return (
    <div className="signin_div">
      <input
        type="text"
        placeholder="user1 "
        onChange={(e) => onUsernameChange(e.target.value)}
      />
      <input
        type="text"
        placeholder="pass1"
        onChange={(e) => onPasswordChange(e.target.value)}
      />

      <button onClick={validate}>log in </button>
    </div>
  );
};

export default SignIn;
