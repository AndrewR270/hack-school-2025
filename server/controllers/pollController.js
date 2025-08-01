const Poll = require('../models/Poll');

const getPolls = async (req, res) => {
  const poll = await Poll.find();
  res.status(200).json(poll);
};
