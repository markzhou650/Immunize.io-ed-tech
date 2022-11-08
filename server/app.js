const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3001;
const mysql = require("mysql");
const { getAllSubjects } = require("./modules/getAllSubjects");
const { getAllQuestions } = require("./modules/getAllQuestions");
const { getSubjectId } = require("./modules/getSubjectId");
const cors = require("cors");

app.use(express.json());
app.use(cors());

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

app.post("/questions", async (req, res) => {
  let subjects = await getAllSubjects(connection);
  // let questions = await getAllQuestions(connection, subjects);
  let subjectNames = [];
  for (let subject of subjects) {
    subjectNames.push(subject.name);
  }

  if (subjectNames.indexOf(req.body.subject) >= 0) {
    let subjectId = await getSubjectId(connection, req.body.subject);

    // WANRING: INPUT IS NOT SANITIZED
    connection.query(
      "INSERT INTO questions (Question, Answer, frn_subject_id) VALUES (?, ?, ?);",
      [req.body.question, req.body.answer, subjectId[0].subject_id],
      (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      }
    );
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
