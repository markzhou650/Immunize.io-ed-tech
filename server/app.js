const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3001;
const mysql = require("mysql");
const { getAllSubjects } = require("./modules/getAllSubjects");
const { getAllQuestions } = require("./modules/getAllQuestions");
const { getSubjectId } = require("./modules/getSubjectId");
const { getSubQuestions } = require("./modules/getSubQuestions");

const cors = require("cors");

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: 3306,
  database: process.env.DB,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
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
  const subjects = await getAllSubjects(connection);
  const questions = await getAllQuestions(connection, subjects);
  const sub_questions = await getSubQuestions(connection)

  res.json({ questions, subjects, sub_questions });
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

app.post("/createquestion", async (req, res) => {
  connection.query(
    "INSERT INTO questions (Question, Answer, frn_subject_id) VALUES (?, ?, ?);",
    [req.body.question, req.body.answer, subjectId[0].subject_id],
    (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.post("/read", async (req, res) => {
  connection.query("SELECT * FROM questions;", (error, results) => {
    res.send(results);
  });
});

app.get("/api/questions", async (req, res) => {
  connection.query(
    "SELECT Question, Answer FROM questions UNION SELECT Question, Answer FROM sub_questions;",
    (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
