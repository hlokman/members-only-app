const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  title: { type: String, minLength: 1, maxLength: 30, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
  text: { type: String, minLength: 1, maxLength: 280, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

messageSchema.virtual("formatted_date").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(
    DateTime.DATETIME_SHORT_WITH_SECONDS
  );
});

module.exports = mongoose.model("Message", messageSchema);
