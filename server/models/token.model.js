const mongoose = require("mongoose");
const { Schema, model } = mongoose

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "UsersInfo",
    unique: true
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

const TokenModel = model("token", tokenSchema);
module.exports = TokenModel;
