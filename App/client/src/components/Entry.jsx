import React, { useEffect, useState } from "react";
import axios from "axios";

const getParts = () => {
  return;
};

const getUsername = async (id) => {
  const response = await axios.post("http://localhost:5000/matching_user", {
    id: id,
  });
  console.log("USERNAME FINAL: ", response.data);

  return "a";
};

const Entry = ({ entryID, name, image, values, onDelete, onUpdate }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const fetchedUsername = await getUsername(entryID);
      setUsername(fetchedUsername);
    };
    fetchUsername(); // Call the function to fetch the username
  }, [entryID]); // Dependency array ensures this runs when `entryID` changes

  return (
    <div>
      <div>
        <p>ID: {entryID}</p>
        <p>name: {name}</p>
        <p>username:{username} </p>
        <p></p>
        <strong>parts:</strong>

        <button onClick={() => onDelete(entryID, username)}>DELETE</button>
        <br />
        <br />
        <button onClick={() => onUpdate(entryID, username)}>UPDATE</button>
      </div>
    </div>
  );
};

export default Entry;
