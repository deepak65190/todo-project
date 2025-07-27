const express = require("express");
const {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
  getSummaryNotes
} = require("../controllers/notesController");
const notesRouter = express.Router();
notesRouter.get("/", getNotes);
notesRouter.get("/summary", getSummaryNotes);
notesRouter.post("/", createNotes);
notesRouter.patch("/:id", updateNotes);
notesRouter.delete("/:id", deleteNotes);
module.exports = notesRouter;
