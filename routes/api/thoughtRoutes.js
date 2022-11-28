const router = require('express').Router();
const thoughts = require('../../controllers/thoughtsController');

//get all thoughts
router.get('/', thoughts.getThoughts);
//get one thought
router.get('/:id', thoughts.getOneThought);
//create a thought
router.post('/', thoughts.createThought);
//update a thought
router.put('/:id', thoughts.updateThought);
//delete a thought
router.delete('/:id', thoughts.deleteThought);
//add a reaction
router.post('/:id/reactions', thoughts.createReaction);
//delete a reaction
router.delete('/:thoughtId/reactions/:reactionId', thoughts.deleteReaction);
module.exports = router;