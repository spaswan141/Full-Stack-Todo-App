const TodoModel = require("../models/todo.model.js");
const jwt = require("jsonwebtoken");
const { use } = require("../routers/todo.router");
module.exports.createTodo = async function (req, res, next) {
  try {
    const { authorization } = req.headers;
    const decodedToken = jwt.decode(authorization);
    const userId = decodedToken._id;

    const newTodo = await TodoModel.create({ ...req.body, userId: userId });
    return res.send({
      message: "todo created Successfull",
    });
  } catch (error) {
    console.log(error);
    return {
      message: error,
    };
  }
};

module.exports.getTodos = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const decodedToken = jwt.decode(authorization);
    const userId = decodedToken._id;

    const todos = await TodoModel.find({ userId: userId });
    return res.send({
      data: todos,
      message: "todos get Successfull",
    });
  } catch (error) {
    console.log(error);
    return {
      message: error,
    };
  }
};
module.exports.deleteTodo = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const todos = await TodoModel.findOneAndDelete({ _id: req.params.id });
      return res.send({
        data: null,
        message: "todo deleted Successfull",
      });
    } else {
      res.send({
        message: "Login required",
      });
    }
  } catch (error) {
    console.log(error);
    return {
      message: error,
    };
  }
};
module.exports.updateTodo = async function (req, res, next) {
  try {
    const { authorization } = req.headers;
    if (authorization) {
        console.log(req.params.id)
      const updateTodo = await TodoModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
      return res.send({
        message: "todo created Successfull",
        data:updateTodo
      });
    } else {
      res.send({
        message: "Login required",
      });
    }
  } catch (error) {
    console.log(error);
    return {
      message: error,
    };
  }
};
