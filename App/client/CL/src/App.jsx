import React, { useEffect, useState } from "react";
import axios from "axios";
import EntryList from "./components/EntryList";
import CreateButton from "./components/CreateButton";
import Form from "./components/Form";
import SignIn from "./components/SignIn";
import "./App.css";

/*
  const [backendData, setBackendData] = useState([{}]);
  const [message, setMessage] = useState("");
  h1>React and Express App</h1>
  <button onClick={apiCall}>Make API call</button>

const apiCall = () => {
  axios.get("http://localhost:5000/").then((response) => {
    //this console.log will be in our frontend console
    console.log(response.data.message);
  });
};*/

const App = () => {
  const [visible, setvisible] = useState("false");
  const [users, setUsers] = useState([]);
  const [sign, setSign] = useState("true");
  const [username, setUserName] = useState("Default");

  const changeSign = () => {
    setSign("false");
  };

  const [entries, setEntries] = useState(() => {
    const returned = localStorage.getItem("entries");
    //   return [];
    if (returned == null) return [];
    return JSON.parse(returned);
  });

  const addUser = (name, password) => {
    setUsers(...users, name + " " + password);
  };

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const toggleVisibility = () => {
    setvisible("false");
  };

  const createNewEntry = (username, image, values) => {
    console.log("WORKING!");
    setEntries(
      // Replace the state
      [
        ...entries,
        {
          entryID: Math.random() * 1000,
          username: username,
          image: image,
          values: values,
          onDelete: deleteEntry,
        },
      ]
    );
  };

  const updateEntry = (id, usernameParam) => {
    console.log("updating!: " + id + "/" + entries.entryID);
    if (username == usernameParam) {
      alert("WORKE");
    } else {
      alert("DENIED");
      return;
    }
  };

  const deleteEntry = (id, usernameParam) => {
    console.log("deleting!: " + id + "/" + entries.entryID);
    if (username == usernameParam) {
      setEntries(entries.filter((entries) => entries.entryID !== id));
    } else {
      alert("DENIED");
      return;
    }
  };
  //<button onClick={deleteEntry}>delete</button>
  // <CreateButton onClick={createNewEntry}></CreateButton>
  return (
    <div className="main_div">
      <button
        onClick={() => {
          setEntries([]);
        }}
      >
        RESET
      </button>
      <br />
      <br />
      {sign == "true" && (
        <SignIn
          addUser={addUser}
          signFunction={changeSign}
          setName={(value) => {
            setUserName(value);
          }}
        ></SignIn>
      )}

      {visible == "true" && (
        <Form
          CreateFunction={createNewEntry}
          visibilityFunction={toggleVisibility}
          username={username}
        ></Form>
      )}

      <button
        onClick={() => {
          setvisible("true");
          createNewEntry;
        }}
      >
        +
      </button>
      <br />
      <br />
      <EntryList
        entries={entries}
        onDelete={deleteEntry}
        onUpdate={updateEntry}
      />
    </div>
  );
};

export default App;
