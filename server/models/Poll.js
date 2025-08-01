const OptionSchema = new mongoose.Schema({
  option: String,
  count: Number,
});

const PollSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  options: [OptionSchema],
});

const Poll = mongoose.model('Poll', PollSchema);

module.exports = Poll;
