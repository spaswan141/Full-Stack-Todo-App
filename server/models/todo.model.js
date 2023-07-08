const { Schema, model } = require("mongoose");
const todosSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "UsersInfo",
  },
  text: {type:String},
});
const Todos = model("Todos", todosSchema);
module.exports = Todos;
