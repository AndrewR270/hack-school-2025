const Poll = require('../models/Poll');

const getPolls = async (req, res) => {
  const poll = await Poll.find();

  console.log('Returning polls list...');
  res.status(200).json(poll);
};

const getPoll = async (req, res) => {
  const { id } = req.params;
  const poll = await Poll.findById(id);

  console.log(`Returning poll ${id}`);
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

  const updateOption = await Poll.updateOne(
    { _id: pollId, 'options._id': optionId },
    {
      $inc: { 'options.$.count': 1, totalVotes: 1 },
    }
  );

  if (updateOption.modifiedCount == 0)
    return res.status(400).json({ error: 'Failed to update poll' });

  const updatedPoll = await Poll.findById(pollId);

  console.log(`Vote cast for ${pollId} on option ${optionId}`);

  res.status(200).json(updatedPoll);
};

module.exports = { getPolls, getPoll, postPoll, postVote };
