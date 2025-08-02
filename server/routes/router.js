const express = require('express');
const router = express.Router();

const pollController = require('../controllers/pollController');

router.get('/polls/id/:id', pollController.getPoll);

router.get('/polls', pollController.getPolls);

router.post('/polls', pollController.postPoll);

router.post('/vote', pollController.postVote);

module.exports = router;
