const router = require('express').Router();

const {
    getThoughts, 
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtsController')

router.route('/').get(getThoughts);
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought)
router.route('/:userId').post(createThought)

router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;