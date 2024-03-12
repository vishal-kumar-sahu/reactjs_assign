const express = require("express");
const app = express();
const router = express.Router();

const mongoose = require("mongoose");
require("../models/notes");
const Note = mongoose.model("Note");

router.post("/createNote", async (req, res) => {
  const { title, description, contributor } = await req.body;

  if (!title || !contributor) {
    return res.send({ error: "Please add all the feilds", status: 422 });
  }

  const check = await Note.findOne({ title: title }).then((val) => {
    if (val !== null && val.title === title) {
      return true;
    } else {
      return false;
    }
  });

  if (check) {
    return res.send({
      error: "Note with this title alredy exist",
      status: 409,
    });
  }

  const note = {
    title: title,
    description: description,
    contributor: contributor,
  };

  const newNote = await new Note(note);

  try {
    const savednote = await newNote.save();
    return res.send({ message: savednote, status: 200 });
  } catch (err) {
    return res.send({ error: err, status: 500 });
  }
});

router.get("/allNotes", async (req, res) => {
  await Note.find({})
    .then((val) => {
      return res.send({ message: val, status: 200 });
    })
    .catch((err) => {
      return res.send({ error: err, status: 500 });
    });
});

router.delete("/deleteNote/:noteId", async (req, res) => {
  await Note.findOne({ _id: req.params.noteId }).then((note) => {
    if (!note) {
      return res.send({ error: err, status: 422 });
    } else {
      note
        .deleteOne()
        .then((result) => {
          return res.send({ message: result, status: 200 });
        })
        .catch((err) => {
          return res.send({ error: err, status: 500 });
        });
    }
  });
});

router.put("/updateNote", async (req, res) => {
  const { title, noteId, description, contributor } = await req.body;

  if (!title || !contributor || !noteId) {
    return res.send({ error: "Please add all the feilds", status: 422 });
  }

  const check = await Note.findOne({ title: title }).then((val) => {
    if (val !== null && val.title === title && (val._id).toString() !== noteId) {
      return true;
    } else {
      return false;
    }
  });

  if (check) {
    return res.send({
      message: "Note with this title alredy exist",
      status: 409,
    });
  }

  await Note.findByIdAndUpdate(
    { _id: noteId },
    {
      $set: {
        title: title,
        description: description,
        contributor: contributor,
      },
    }
  )
    .then((note) => {
      return res.send({ message: note, status: 200 });
    })
    .catch((err) => {
      return res.send({ error: err, status: 500 });
    });
});

module.exports = router;
