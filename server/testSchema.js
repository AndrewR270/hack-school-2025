const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// create config object witH PORT
const config = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
};
mongoose
  .connect(config.DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB: ", err));

const Poll = require("./models/Poll");

const testSchema = async (req, res) => {
  const poll = new Poll({
    _id: mongoose.Types.ObjectId.createFromHexString(
      "67144a73c527df736fbe5eac"
    ),
    ownerId: "Your name!",
    title: "Your awesome poll title!",
    description: "A meh poll description",
    options: [
      {
        option: "Poll option 1",
        count: 0,
        _id: mongoose.Types.ObjectId.createFromHexString(
          "67144a73c527df736fbe5ead"
        ),
      },
    ],
  });
  await poll.save();
  console.log("Success!");
};

testSchema();
