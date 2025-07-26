const express = require("express");
const {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
} = require("../controllers/notesController");
const notesRouter = express.Router();
notesRouter.get("/", getNotes);
notesRouter.post("/", createNotes);
notesRouter.patch("/:id", updateNotes);
notesRouter.delete("/:id", deleteNotes);
module.exports = notesRouter;
