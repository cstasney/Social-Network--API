const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} =require('../../controllers/usersController')

router.route('/').get(getUsers).post(createUser)
router.route('/:id').get(getOneUser).put(updateUser).delete(deleteUser)
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;