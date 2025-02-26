import React, { useEffect, useState } from "react";
import axios from "axios";
import EntryList from "./components/EntryList";
import Form from "./components/Form";
import SignIn from "./components/SignIn";
import "./App.css";

const App = () => {
  const [visible, setvisible] = useState("false");
  const [users, setUsers] = useState([]);
  const [sign, setSign] = useState("true");
  const [username, setUserName] = useState("Default");
  const [loading, setLoading] = useState(false);

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
    console.log("UPDATING ENTRIES!");
  }, [entries]);

  useEffect(() => {}, [entries]);

  const fetchEntries = async () => {
    setLoading(true);
    console.log("FETCH ENTRIES: ", entries);
    try {
      const response = await axios.get(API_URL);
      //setEntries((entries) => [...entries, response.data]);
      console.log("AAAAA: ", response.data);
      const data = Array.isArray(response.data) ? response.data : [];

      setEntries(data);
      console.log("ENTRIES: ", response.data);
    } catch (error) {
      console.error("Error fetching entries", error);
    } finally {
      setLoading(false); // End loading state
    }
  };
  const toggleVisibility = () => {
    setvisible("false");
  };

  const pushEntries = async (entry) => {
    setLoading(true);
    console.log("PUSH ENTRIES: ", entries);

    try {
      const response = await axios.post(API_URL, {
        id: entry.entryID,
        name: entry.name,
        username: entry.username,
        values: entry.values,
      });
      //setEntries((entries) => [...entries, response.data]);
      console.log("VVVVVVVVVVVVVVVVVVV: ", response);
      const data = response.data;
      setEntries(data);
      // console.log("ENTRIES: ", entries);
    } catch (error) {
      console.error("Error pushing entries", error);
    } finally {
      setLoading(false);
    }
  };

  const createNewEntry = (name, username, values) => {
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
      {loading ? ( // Show loading state
        console.log("LOADING...")
      ) : (
        //<p>Loading entries...</p>
        <EntryList
          entries={entries}
          onDelete={deleteEntry}
          onUpdate={updateEntry}
        />
      )}
    </div>
  );
};

export default App;
