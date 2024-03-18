module.exports = app => {
  const toDo = require("../controllers/todo.controller.js");

  var router = require("express").Router();

  router.post("/", toDo.create);
  router.get("/", toDo.findAll);
  router.post("/update-todo", toDo.update);
  router.post("/update-status", toDo.updateStatus);


  app.use("/api/todo", router);
};
