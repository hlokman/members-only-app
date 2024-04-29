#! /usr/bin/env node
const bcrypt = require("bcryptjs");

console.log("test");

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Message = require("./models/message");
const User = require("./models/user");

const messages = [];
const users = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createMessages();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// users[0] will always be the same one, regardless of the order
// in which the elements of promise.all's argument complete.
async function userCreate(
  index,
  first_name,
  last_name,
  username,
  email,
  password,
  membership,
  isAdmin
) {
  const user = new User({
    first_name: first_name,
    last_name: last_name,
    username: username,
    email: email,
    password: await bcrypt.hash(password, 10),
    membership: membership,
    isAdmin: isAdmin,
  });
  await user.save();
  users[index] = user;
  console.log(`Added user: ${username}`);
}

async function messageCreate(index, title, timestamp, text, user) {
  const message = new Message({
    title: title,
    timestamp: timestamp,
    text: text,
    user: user,
  });

  await message.save();
  messages[index] = message;
  console.log(`Added message: ${title}`);
}

//To use the functions that we created
async function createUsers() {
  console.log("Adding users");
  await Promise.all([
    userCreate(
      0,
      "John",
      "Doe",
      "JojoD",
      "jojod@gmail.com",
      "jojod123",
      false,
      false
    ),
    userCreate(
      1,
      "Amir",
      "Sah",
      "Amirrr",
      "amirrr@random.com",
      "am123456",
      false,
      false
    ),
    userCreate(
      2,
      "Joel",
      "Derick",
      "JoTheBest",
      "joethebest@random.com",
      "jo123456",
      false,
      false
    ),
    userCreate(
      3,
      "Christina",
      "Smith",
      "Chris",
      "chris@random.com",
      "ch123456",
      false,
      false
    ),
    userCreate(
      4,
      "Sophia",
      "Lee",
      "Soso",
      "sophia@random.com",
      "so123456",
      false,
      false
    ),
    userCreate(
      5,
      "Livai",
      "Ackermann",
      "Livai",
      "livai@random.com",
      "li123456",
      false,
      false
    ),
  ]);
}

async function createMessages() {
  console.log("Adding messages");
  await Promise.all([
    messageCreate(
      0,
      "First",
      new Date("January 21, 2024 01:15:00"),
      "This is the first post hehehe",
      users[0]
    ),
    messageCreate(
      1,
      "What a day",
      new Date("January 22, 2024 12:15:23"),
      "What a great day!",
      users[1]
    ),
    messageCreate(2, "A", new Date("January 22, 2024 17:44:34"), "O", users[2]),
    messageCreate(
      3,
      "I don't know",
      new Date("February 1, 2024 6:02:01"),
      "I don't know what to post",
      users[3]
    ),
    messageCreate(
      4,
      "MAKE ME AN ADMIN",
      new Date("February 1, 2024 6:02:01"),
      "I WILL OVERTAKE THE WORLD",
      users[4]
    ),
  ]);
}
