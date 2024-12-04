const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;

app.use(cors());
app.use(express.json()); //middleware to convert body to json

app.listen(PORT, () => console.log("Listening..."));

app.get("/", (req, res) => {
  res.status(200).send({
    message: " SUCCESS",
  });
});

app.get("/tshirt", (req, res) => {
  res.status(200).send({
    tshirt: "aaa",
    size: "large",
  });
});

app.post("/tshirt/:id", (req, res) => {
  const { id } = req.params;

  const { logo } = req.body;

  if (!logo) {
    res.status(418).send({
      message: "logo paramater missing!",
    });
  }
  res.send({
    tshirt: "success",
  });
});
