const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  title: { type: String, minLength: 1, maxLength: 30, required: true },
  timestamp: { type: Date, required: true },
  text: { type: String, minLength: 1, maxLength: 280, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Message", messageSchema);
