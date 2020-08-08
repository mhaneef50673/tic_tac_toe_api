const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const utils = require("./utils");

const filePath = "/data.json";

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const context = process.env.CONTEXT || "/api";

// ROUTES START
app.post(`${context}/v1/saveLeaderboard`, async (req, res) => {
  try {
    const result = req.body;
    console.log('result Data', result);
    utils.saveData(result, filePath);
    res.status(201).send({ status: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "failure" });
  }
});
app.get(`${context}/v1/getLeaderboard`, (req, res) => {
  const data = utils.readData(filePath) || {
    leaderboard: [],
  };
  return res.send(data);
});

app.get(`${context}/`, (req, res) => res.send("Tic Tac Toe API!"));

// ROUTES END

//start app
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`App is listening on port ${port}.`));
