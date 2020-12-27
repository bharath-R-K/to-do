const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/todo");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "error in connection to db"));

db.once("open", function () {
  console.log("Successfully connected");
});
