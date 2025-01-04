const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");

process.on("SIGTERM ", () => {
  connection.end((err) => {
    if (err) {
      console.error("Error closing MySQL connection:", err);
    } else {
      console.log("MySQL connection closed.");
    }
    process.exit();
  });
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "artholus6*Databa5e",
  database: "express",
  connectTimeout: 6000000,
});

connection.connect((err) => {
  if (err) {
    console.error("Error reconnecting to database:", err);
    setTimeout(handleDisconnect, 2000); // Retry after 2 seconds
  }
});

connection.connect();

connection.query("SELECT * FROM entry", (err, rows, fields) => {
  if (err) {
    throw err;

    return;
  }
  console.log("Rows returned:", rows);
  //  console.log("The solution is: ", rows[0].solution);
});

let entries = [];

app.use(cors());
app.use(express.json()); //middleware to convert body to json

app.get("/", (req, res) => {
  res.status(200).send({
    message: " SUCCESS",
  });
});

app.post("/entries", (req, res) => {
  const { id, name, username, values } = req.body; // Extract data from request body

  entryCount = parseInt("SELECT COUNT(*) FROM entry");
  entryPartCount = parseInt("SELECT COUNT(*) FROM entry_part");
  userCount = parseInt("SELECT COUNT(*) FROM user");
  partsCount = parseInt("SELECT COUNT(*) FROM parts");

  entry_id = Math.floor(Math.random() * 10000);
  console.log("ENTRY_ID: ", entry_id);

  const query1 = `INSERT INTO entry VALUES (${entry_id}, '${name}', 41)`;

  connection.query(query1, [id, name, username, values], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).send("Database error");
      return;
    }
    console.log("Query result1 :", results);
  });

  for (i = 0; i < values.length; i++) {
    console.log("ENTRY_ID 2: ", entry_id);

    ////////////////////////////////////////////
    console.log("VALUES:" + values[i].part);
    console.log("VALUES:" + values[i].price);

    parts_id = Math.floor(Math.random() * 10000);

    const query2 = `INSERT INTO parts (id,name,price) VALUES (${parts_id}, '${values[
      i
    ].part.toString()}',${values[i].price})`;

    connection.query(query2, (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Database error");
        return;
      }
      console.log("Query result2 :", results);
    });

    const query3 = `INSERT INTO entry_parts (Entry_id, User_id, Parts_id) VALUES  (${entry_id}, 41,${parts_id})`;
    console.log("ENTRY_ID 3: ", entry_id);

    connection.query(query3, (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Database error");
        return;
      }
      console.log("Query result3 :", results);
    });
  } ///////////////////////////////////////////////////////

  //res.status(200).send("Entry added successfully");
});

app.get("/entries", (req, res) => {
  console.log("/////////////////////////////////////////////");
  const query = "SELECT * FROM entry";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Database error");
      entries = results;
      return;
    }
    entries = results;
    console.log("entries: ", entries);
  });

  res.json(entries);
  res.status(200).send({ data: entries });
});

app.post("/sign_in", (req, res) => {
  const { username, password } = req.body;
  console.log("USERNAME: ", username, " PASSWORD: ", password);
  const query = `SELECT * FROM user WHERE name= '${username}' AND password='${password}' `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Database error");
      return;
    }
    console.log("RESULTS: ", results);
    console.log("RESULTS length: ", results.length);
    const rowCount = results.length;

    res.status(200).send({ rowCount, data: results });
  });
});

app.post("/matching_user", (req, res) => {
  const { id } = req.body;

  // const query = `  SELECT * FROM entry JOIN user ON user.id = entry.User_id  WHERE entry.id = ${id};`;

  const query = `  SELECT user.name FROM entry JOIN user ON user.id = entry.User_id  WHERE entry.id = ${id};`;

  console.log("QUERY: ", query);

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Database error");
      return;
    }
    entries = results;
    const username = results.length > 0 ? results[0].name : null;
    console.log("MATCHING RESULT: ", username);

    res.status(200).send({ username });
  });
});

app.listen(PORT, () => console.log("Listening..."));

//connection.end();
