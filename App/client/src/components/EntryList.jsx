import Entry from "./Entry";
import React, { useEffect, useState } from "react";

const EntryList = ({ entries, onDelete, onUpdate }) => {
  return (
    <>
      {entries.length === 0 && "No Entries"}
      {console.log("ENTRY: ", entries)}
      {entries.length > 0 &&
        entries.map((entry) => {
          return (
            <Entry
              key={entry.entryID}
              entryID={entry.entryID}
              username={entry.username}
              image={"image"}
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
