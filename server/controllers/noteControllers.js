const noteModel = require("../models/notes");

const createNote = async (req, res) => {
  //console.log(req.userId);
  const { title, description } = req.body;
  const newNote = new noteModel({
    title: title,
    description: description,
    userId: req.userId,
  });

  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const updateNote = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const newNote = {
    title: title,
    description: description,
    userId: req.userId,
  };
  try {
    // {new:true} database mein jayega fr update fr return
    await noteModel.findByIdAndUpdate(id, newNote, { new: true });
    res.status(200).json(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const deleteNote = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await noteModel.findByIdAndRemove({ id });
    res.status(202).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const getNote = async (req, res) => {
  try {
    //database mein jitne bhi notes hon ge ish variable mein store hon ge

    const notes = await noteModel.find({ userId: req.userId });
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  getNote,
};
