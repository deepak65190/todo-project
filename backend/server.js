require("dotenv").config();
const notesRouter = require("./routes/notesRoute.js");
const cors=require("cors")
const conndectDB = require("./config/db.js");
const express = require("express");
const path = require("path");
const app = express();
app.use(cors("*"))
const PORT = process.env.PORT || 8081;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//connect to database
conndectDB();


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//all the routes
app.use("/api/v1/notes", notesRouter);


//app listing
app.listen(PORT, () => {
  console.log(`server listion on port no ${PORT}`);
});
