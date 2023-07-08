const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  age:{type:String, required: true}
});

const User = model("UsersInfo", UserSchema);

module.exports = User