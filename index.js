const express = require("express");

const path = require("path");
// mongoose route
const db = require("./config/mongoose");
// mongoose schema route
const todo = require("./modules/todo");

const app = express();

const port = 8008;
// settingup the view engine as ejs s
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);

// middleware to use static files as css,js, images
app.use(express.static("assets"));

var tasks = [
  {
    Description: "",
    task: "",
    Category: "",
  },
];

app.get("/", function (req, res) {
  todo.find({}, function (err, todolist) {
    if (err) {
      console.log("**Error in feth");
      return;
    }

    return res.render("home", {
      task_list: todolist,
    });
  });
  // return res.render("home", {
  //   task_list: tasks,
});

app.post("/list", function (req, res) {
  //console.log(req.body.task_list);
  // if (
  //   req.body.Description != null &&
  //   req.body.taskdate != null &&
  //   req.body.category != null
  // ) {
  //   tasks.push({
  //     Description: req.body.Description,

  //     task: req.body.taskdate,
  //     Category: req.body.category,
  //   });
  // }
  todo.create(
    {
      Description: req.body.Description,
      task: req.body.taskdate,
      Category: req.body.category,
    },
    function (err, new_todo) {
      if (err) {
        console.log("error in created list");
        return;
      }

      return res.redirect("back");
    }
  );

  //return res.redirect("/");
});

// for deleting the task
app.get("/delete-task/", function (req, res) {
  // get the id from the query in the ul
  let id = req.query.id;

  // find the task in the database using ID and delete the task
  todo.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("error in deleting an object for database");
      return;
    }
  });

  return res.redirect("back");
});

// making the server listen
app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`your port ${port} is up and running`);
});
