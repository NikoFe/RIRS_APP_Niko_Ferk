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

function print(entries) {
  console.log("ENTRYLIST: ", entries);
}
const EntryList = ({ entries, onDelete, onUpdate }) => {
  return (
    <>
      {print(entries)}
      {entries.length <= 0 && "No Entries"}
      {entries.length > 0 &&
        entries.map((entry) => {
          return (
            <Entry
              entryID={entry.id}
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
