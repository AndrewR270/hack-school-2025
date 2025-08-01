const Poll = require('../models/Poll');

const getPolls = async (req, res) => {
  const poll = await Poll.find();
  res.status(200).json(poll);
};

const postPoll = async (req, res) => {
  const { ownerId, title, description, options } = req.body;

  if (!ownerId || !title || !options)
    return res.status(404).json({ error: 'Invalid request' });

  const poll = new Poll({
    ownerId: ownerId,
    title: title,
    description: description,
    options: options,
  });

  await poll.save();

  res.status(200).json(poll);
};

const postVote = async (req, res) => {
  const { pollId, optionId } = req.body;

  if (!pollId || !optionId)
    return res.status(400).json({ error: 'Invalid request' });

  const result = await Poll.updateOne(
    { _id: pollId, 'options._id': optionId },
    {
      $inc: { 'options.$.count': 1 },
    }
  );

  if (result.modifiedCount == 0)
    return res.status(400).json({ error: 'Failed to update poll' });

  res.status(200).json({ message: 'Success' });
};

module.exports = { getPolls, postPoll, postVote };
