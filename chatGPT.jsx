import React, { useEffect, useState } from "react";
import axios from "axios";
import EntryList from "./components/EntryList";
import Form from "./components/Form";
import SignIn from "./components/SignIn";
import "./App.css";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [sign, setSign] = useState(true);
  const [username, setUserName] = useState("Default");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for better UX

  const API_URL = "http://localhost:5000/entries";

  // Fetch entries when the component mounts
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setLoading(true); // Indicate loading
    try {
      const response = await axios.get(API_URL);
      const data = Array.isArray(response.data) ? response.data : [];
      setEntries(data);
      console.log("Fetched entries: ", data);
    } catch (error) {
      console.error("Error fetching entries", error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  const pushEntries = async (entry) => {
    try {
      setLoading(true); // Indicate loading
      console.log("Pushing new entry to backend: ", entry);

      const response = await axios.post(API_URL, {
        id: entry.entryID,
        name: entry.name,
        username: entry.username,
        values: entry.values,
      });

      console.log("Response from backend: ", response.data);

      // Fetch updated entries from the backend after successful push
      fetchEntries(); 
    } catch (error) {
      console.error("Error pushing entry to backend", error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  const createNewEntry = (name, username, values) => {
    const newEntry = {
      name,
      entryID: Math.floor(Math.random() * 10000), // Generate unique ID
      username,
      values,
    };

    // Push new entry to the backend and wait for confirmation
    pushEntries(newEntry);
  };

  const changeSign = () => setSign(false);
  const toggleVisibility = () => setVisible(!visible);

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
      {sign && (
        <SignIn
          addUser={(name, password) => setUsers([...users, `${name} ${password}`])}
          signFunction={changeSign}
          setName={setUserName}
        />
      )}

      {visible && (
        <Form
          CreateFunction={createNewEntry}
          visibilityFunction={toggleVisibility}
          username={username}
        />
      )}

      <button onClick={() => setVisible(true)}>+</button>
      <br />
      <br />

      {loading ? ( // Show loading state
        <p>Loading entries...</p>
      ) : (
        <EntryList
          entries={entries}
          onDelete={(id) => console.log("Delete entry:", id)}
          onUpdate={(id, username) => console.log("Update entry:", id, username)}
        />
      )}
    </div>
  );
};

export default App;