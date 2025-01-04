import Entry from "./Entry";
import axios from "axios";
import React, { useEffect, useState } from "react";

/*
<Entry
key={entry.entryID}
entryID={entry.entryID}
username={entry.username}
image={"image"}
values={entry.values}
onDelete={onDelete}
onUpdate={onUpdate}
></Entry>
*/

const EntryList = ({ entries, onDelete, onUpdate }) => {
  return (
    <>
      {entries.length === 0 && "No Entries"}
      {entries.length > 0 &&
        entries.map((entry) => {
          return (
            <Entry
              key={entry.id}
              name={entry.name}
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
