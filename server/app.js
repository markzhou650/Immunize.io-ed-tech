const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const fs = require("fs");

let data = fs.readFileSync("./JSONtests/mcqtest.json");
let questions = JSON.parse(data);

app.get("/questions", (req, res) => {
    // res.json({ message: "If you see this message, Node is connected" });
    // res.json({ message: questions[1].Question })
    res.json({ questions: questions})
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})