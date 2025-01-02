const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const mysql = require("mysql2");

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

let currentId = 1;

app.post("/entries", (req, res) => {
  const { id, name, username } = req.body; // Extract data from request body

  const query = `INSERT INTO entry VALUES (1, 'entry1', 41)`;

  connection.query(query, [id, name, username], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).send("Database error");
      return;
    }
    console.log("Query result:", results);
    res.status(200).send("Entry added successfully");
  });
});

app.get("/entries", (req, res) => {
  res.json(entries);
});

app.listen(PORT, () => console.log("Listening..."));

//connection.end();
