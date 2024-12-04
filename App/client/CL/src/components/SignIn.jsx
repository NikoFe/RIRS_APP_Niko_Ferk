import React, { useEffect, useState } from "react";

const SignIn = ({ addUser, signFunction, setName }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (value) => {
    setUsername(value);
  };
  const onPasswordChange = (value) => {
    setPassword(value);
  };

  const validate = () => {
    if (username != "" && password != "") {
      console.log("USERNAME: " + username + " PASSWORD: " + password);

      setName(username);

      signFunction();
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
