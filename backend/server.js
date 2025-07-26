require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8081;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//app listing
app.listen(PORT, () => {
  console.log(`server listion on port no ${PORT}`);
});
