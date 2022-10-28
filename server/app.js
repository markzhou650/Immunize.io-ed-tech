const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3001;
const mysql = require("mysql");

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

async function getAllSubjects() {
  let subjectPromise = new Promise((resolve, reject) => {
    connection.query("SELECT * FROM subject", (error, results, fields) => {
      if (error) throw error;
      let subjects = [];
      subjects = subjects.concat(results);
      console.log(subjects);
      resolve(subjects);
    });
  });

  return subjectPromise;
}

async function getAllQuestions(subjects) {
  let questionPromise = new Promise(async (resolve, reject) => {
    let questions = {};
    for (let subject of subjects) {
      questions[subject.name] = await getQuestion(subject.subject_id);
    }
    resolve(questions);
  });
  return questionPromise;
}

async function getQuestion(subject_id) {
  let questionPromise = new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM questions WHERE frn_subject_id = ${subject_id}`,
      (error, results, fields) => {
        if (error) throw error;
        resolve(results);
      }
    );
  });
  return questionPromise;
}

app.get("/questions", async (req, res) => {
  // res.json({ message: "If you see this message, Node is connected" });
  // res.json({ message: questions[1].Question })

  let subjects = await getAllSubjects();
  console.log(subjects);

  let questions = await getAllQuestions(subjects);
  console.log(questions);

  res.json({ questions: questions });
});

// app.post("/questions", (req, res) => {
//   let key = Object.keys(req.body)[0];
//   let value = Object.values(req.body)[0];
//   questions[key] = value;
//   fs.writeFileSync("./JSONtests/mcqtest.json", JSON.stringify(questions));
//   res.json(questions);
// });

// app.put("/questions", (req, res) => {
//   let key = Object.keys(req.body)[0];
//   let value = Object.values(req.body)[0];
//   // if (key in questions) {
//   //   questions[key] = value;
//   //   fs.writeFileSync("./JSONtests/mcqtest.json", JSON.stringify(questions));
//   //   res.json(questions);
//   // }
//   questions[key] = value;
//   fs.writeFileSync("./JSONtests/mcqtest.json", JSON.stringify(questions));
//   res.json(questions);
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
