import Entry from "./Entry";
import React, { useEffect, useState } from "react";

const EntryList = ({ entries, onDelete, onUpdate }) => {
  return (
    <>
      {entries.length === 0 && "No Entries"}
      {entries.map((entry) => {
        return (
          <Entry
            key={entry.entryID}
            entryID={entry.entryID}
            username={entry.username}
            image={entry.image}
            values={entry.values}
            onDelete={onDelete}
            onUpdate={onUpdate}
          ></Entry>
        );
      })}
    </>
  );
};

export default EntryList;
