const todoSchema = require('../models/todo-model')

exports.getTodosByUsername = async (req, res) => {
  const todos = await todoSchema.find({creator: req.user._id})
  res.status(200).json({success: true, items: todos})
}

exports.createTodo = async (req, res) => {
  const newTodo = new todoSchema({
    content: req.body.todoContent,
    creator: req.user._id,
    img: req.body.img,
    date: new Date(req.body.date)
  })

  res.status(200).send({success: true, item: await newTodo.save()})
}

exports.removeTodo = async (req, res) => {
  const todoForDelte = await todoSchema.findOne({_id: req.params.todoId})


  if (todoForDelte.creator === req.user._id) {
    await todoSchema.deleteOne({_id: req.params.todoId})
  
    res.status(200).send({success: true})
  } else {
    res.sendStatus(403).json({success: false, msg: 'permissions denied'})
  }
}

exports.changeStatus = async (req, res) => {
  const todoForEdit = await todoSchema.findOne({_id: req.params.todoId})

  if (todoForEdit.creator === req.user._id) {
    todoForEdit.isCompleted = req.body.newStatus
    await todoForEdit.save()
  
    res.status(200).send({success: true, item: todoForEdit._doc})
  } else {
    res.sendStatus(403).json({success: false, msg: 'permissions denied'})
  }
}