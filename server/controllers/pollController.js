// TODO
// ACTIVITY - Refactor all controller functions to handle requests!

const Poll = require("../models/Poll");

// add req, res to parameters
const getPolls = async () => {
  const poll = await Poll.find();
  console.log("Returning polls list...");
  return poll; // refactor for 200 status code response
};

// replace id with req, res in parameters
const getPoll = async (id) => {
  // extract id from req.params
  const poll = await Poll.findById(id);

  console.log(`Returning poll ${id}`);
  return poll; // refactor for 200 status code response
};

// replace {} parameter with req, res
const postPoll = async ({ ownerId, title, description, options }) => {
  // extract poll information from req
  if (!ownerId || !title || !options) return; // replace with 404 Error

  const poll = new Poll({
    ownerId: ownerId,
    title: title,
    description: description,
    options: options,
  });

  await poll.save();
  return poll; // replace with status code 200 response
};

// replace pollId and optionId with req, res
const postVote = async ({ pollId, optionId }) => {
  // extract pollId and optionId from req
  if (!pollId || !optionId) return; // update for 400 Error

  const updateOption = await Poll.updateOne(
    { _id: pollId, "options._id": optionId },
    {
      $inc: { "options.$.count": 1, totalVotes: 1 },
    }
  );

  if (updateOption.modifiedCount == 0) return "Error: failed to update poll"; // update for 400 Error

  const updatedPoll = await Poll.findById(pollId);

  console.log(`Vote cast for ${pollId} on option ${optionId}`);

  return updatedPoll; // update for status code 200 res
};

module.exports = { getPolls, getPoll, postPoll, postVote };
