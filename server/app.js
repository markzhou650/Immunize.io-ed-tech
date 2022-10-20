const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const fs = require("fs");

let data = fs.readFileSync("./JSONtests/mcqtest.json");
let questions = JSON.parse(data);

app.use(express.json());

app.get("/questions", (req, res) => {
  // res.json({ message: "If you see this message, Node is connected" });
  // res.json({ message: questions[1].Question })
  res.json({ questions: questions });
});

app.post("/questions", (req, res) => {
  let key = Object.keys(req.body)[0];
  let value = Object.values(req.body)[0];
  questions[key] = value;
  fs.writeFileSync("./JSONtests/mcqtest.json", JSON.stringify(questions));
  res.json(questions);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
