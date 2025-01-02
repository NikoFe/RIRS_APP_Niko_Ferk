import React from "react";

const Entry = ({ entryID, username, image, values, onDelete, onUpdate }) => {
  return (
    <div>
      <div>
        <p>ID: {entryID}</p>
        <p>username: {username}</p>

        <button onClick={() => onDelete(entryID, username)}>DELETE</button>
        <br />
        <br />
        <button onClick={() => onUpdate(entryID, username)}>UPDATE</button>
      </div>
    </div>
  );
};

export default Entry;
