const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3001;
const mysql = require("mysql");
const { getAllSubjects } = require("./modules/getAllSubjects");
const { getAllQuestions } = require("./modules/getAllQuestions");

app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DB,
  user: process.env.USER,
  password: process.env.PWD,
  insecureAuth: true,
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.get("/questions", async (req, res) => {
  let subjects = await getAllSubjects(connection);
  let questions = await getAllQuestions(connection, subjects);

  res.json({ questions: questions });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
