const router = require('express').Router();

const {
    getThoughts, 
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../constrollers/thoughtsController')

router.route('/').get(getThoughts);
router.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought);
router.route('/:userId').create(createThought)

router.route('/:thoughtId/reactions').post(addReaction);
router.route('/thoughtId/reactions/:reactionId').delete(deleteReaction)

modele.exports = router;