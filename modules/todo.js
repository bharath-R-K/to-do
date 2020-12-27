const mongoose = require("mongoose");
const DateOnly = require("mongoose-dateonly")(mongoose);

const todoschema = new mongoose.Schema({
  Description: {
    type: String,
    required: true,
  },
  task: {
    type: DateOnly,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
});

const todo = mongoose.model("todo", todoschema);
module.exports = todo;
