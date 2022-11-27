const router = require('express').Router();
const users = require('../../controllers/userController');

//get all users
router.get('/', users.getUsers);
//get one user
router.get('/:id', users.getOneUser);
//create a user
router.post('/', users.createUser);
//update a user
router.put('/:id', users.updateUser);
//delete a user
router.delete('/:id', users.deleteUser);
//add a friend
router.post('/:userId/friends/:friendId', users.addFriend);
//delete a friend
router.delete('/:userId/friends/:friendId', users.deleteFriend);
module.exports = router;