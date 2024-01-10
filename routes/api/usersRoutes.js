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
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser)
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;