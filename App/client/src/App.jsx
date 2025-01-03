import React, { useEffect, useState } from "react";
import axios from "axios";
import EntryList from "./components/EntryList";
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

  const [entries, setEntries] = useState([]);

  const addUser = (name, password) => {
    setUsers(...users, name + " " + password);
  };
  /////////////////////

  const API_URL = "http://localhost:5000/entries";

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    console.log("Updated entries:", entries);
    console.log("Updated entries:", entries.length);
  }, [entries]);

  const fetchEntries = async () => {
    console.log("FETCHING ENTRIES");
    try {
      const response = await axios.get(API_URL);
      //setEntries((entries) => [...entries, response.data]);

      console.log("FETCHING RESPONSE: ", response.data);
      const data = response.data;
      console.log("data: ", data);
      setEntries(data);
      // console.log("ENTRIES: ", entries);
    } catch (error) {
      console.error("Error fetching entries", error);
    }
  };
  const toggleVisibility = () => {
    setvisible("false");
  };

  const pushEntries = async (entry) => {
    console.log("PUSH ENTRIES: ", entries);

    try {
      const response = await axios.post(API_URL, {
        id: entry.entryID,
        name: entry.name,
        username: entry.username,
        values: entry.values,
      });
      //setEntries((entries) => [...entries, response.data]);

      console.log("RESPONSE: ", response.data);
      const data = response.data;
      console.log("data: ", data);
      setEntries(data);
      // console.log("ENTRIES: ", entries);
    } catch (error) {
      console.error("Error pushing entries", error);
    }
  };

  const createNewEntry = (name, username, values) => {
    console.log("values:!", values);
    console.log("entries 1:!", entries);

    const newEntry = {
      name: name,
      entryID: Math.random() * 1000,
      username: username,
      values: values,
      onDelete: deleteEntry,
    };

    setEntries((prevEntries) => {
      const updatedEntries = [...prevEntries, newEntry]; // Create the updated array
      pushEntries(newEntry); // Push only the new entry to the backend
      return updatedEntries; // Update the state with the new array
    });

    // () => {
    //  pushEntries(entries[entries.length]);
    // },
  };

  ///////////////////////////////////
  const updateEntry = (id, usernameParam) => {
    return;
  };

  const deleteEntry = (id, usernameParam) => {
    return;
  };

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
