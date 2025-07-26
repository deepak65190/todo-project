const notesModel = require("../models/notesModel");

const getNotes = async (req, res) => {
  try {
    const notes = await notesModel.find();
    res.status(200).json({
      success: true,
      message: "fetched data successfully",
      data: notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
      error: err.message,
    });
  }
};

const createNotes = async (req, res) => {
  try {
    const noteData = req.body;
    console.log(noteData)
    const newNote = await notesModel.create(noteData);
    res.status(201).json({
      success: true,
      message: "note created successfull",
      data: newNote,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to create note",
      error: err.message,
    });
  }
};


const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const upDatedNote = req.body;
    const updatedNote = await notesModel.findByIdAndUpdate(id, upDatedNote, {
      new: true,
      runValidators: true,
    });
    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to update note",
      error: err.message,
    });
  }
};


const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await notesModel.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: deletedNote,
    });
  } catch (err) {
    res.status();
  }
};
module.exports = { getNotes, createNotes, updateNotes, deleteNotes };
