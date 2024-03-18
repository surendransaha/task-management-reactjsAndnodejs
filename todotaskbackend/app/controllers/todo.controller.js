const db = require("../models");
const Todo = db.todo;

// Create and Save a new Tutorial
exports.create = async(req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Title can not be empty!" });
    return;
  }
  if (!req.body.description) {
    res.status(400).send({ message: "Description can not be empty!" });
    return;
  }

  if (!req.body.dueDate) {
    res.status(400).send({ message: "Due Date can not be empty!" });
    return;
  }

  if (!req.body.priority) {
    res.status(400).send({ message: "Priority can not be empty!" });
    return;
  }

  // Duplicate Entry Validation
  if (req.body.title) {
  
    const todoListDuplicate = await Todo.find({ title: { $regex: req.body.title, $options: 'i' } },{_id:1});

    console.log("cccc", todoListDuplicate)

    if(todoListDuplicate.length > 0){
    res.status(400).send({ message: "This Data Already Exist!" });
    return;
    }


  }


  // Create a todo
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    status: req.body.status ? req.body.status : 1 
  });

  // Save todo in the database
  todo
    .save(todo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};


exports.findAll = async (req, res) => {
  var condition = { status: 1};
  var page = req.query.page || 1;
  var limit = req.query.limit || 1;
  var totalTodoList = await Todo.count({ status: 1 });
  var totalPage = totalTodoList/limit;

  Todo.find(condition)
    .skip((page - 1) * limit)
    .limit(limit)
    .then(data => {

      let outputData = {
        currentPage: page,
        totalPage:Math.round(totalPage),
        totalData: totalTodoList,
        data:data
      }

      res.send(outputData);

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.update = async (req, res) => {

  try {
    const { status, title, description, dueDate, priority,  id } = req.body;


    let object = {
      title : title ? title: null,
      description : description ? description: null,
      dueDate : title ? new Date(dueDate): null,
      priority : priority ? priority: null,
      status : status ? status: null,
    }

    const updatedTodo = await Todo.findByIdAndUpdate( id,
       object,
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};


exports.updateStatus = async (req, res) => {

  try {
    const { status, id } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate( id,
      { status : status },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};

