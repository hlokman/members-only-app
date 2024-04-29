const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, minLength: 1, maxLength: 25, required: true },
  last_name: { type: String, minLength: 1, maxLength: 25, required: true },
  username: {
    type: String,
    minLength: 1,
    maxLength: 25,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: { type: String, minLength: 6, required: true },
  membership: { type: Boolean, required: true },
  isAdmin: { type: Boolean, required: true },
});

userSchema.virtual("full_name").get(function () {
  return this.first_name + " " + this.last_name;
});

module.exports = mongoose.model("User", userSchema);
