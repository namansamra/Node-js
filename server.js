const express = require("express");
const dotenv = require("dotenv");

// load env variables
dotenv.config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(process.env.PORT, () => {
  console.log("server running on post" + process.env.PORT);
});
