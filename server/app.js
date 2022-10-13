const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/post", (req, res) => {
    res.json({ message: "If you see this message, Node is connected" });
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})