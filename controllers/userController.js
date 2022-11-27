const { ObjectId } = require('mongoose').Types;
const { Thought, User, reactionSchema } = require('../models');

module.exports = {

    //get all users
    async getUsers(req, res) {
        try {
            const allUsers = await User.find();
            return res.status(200).json(allUsers);
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    //get one user by Id
    async getOneUser(req, res) {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                return res.status(400).json({ message: "Can't find user with that ID" })
            }
            return (res.status(200).json(user));
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            return res.status(201).json(user);
        } catch (err) {
            return res.status(400).json(err.message);
        }
    },

    //update user
    async updateUser(req, res) {
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            return updateUser ? res.status(200).json(updateUser) : res.status(404).json({ message: "Can't find User with that ID" })
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    //delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (user) {
                await Thought.deleteMany({
                    username: user.username
                });
                return res.status(201).json({ message: "Deleted user" });
            }
            return res.status(404).json({ message: "Can't find User with that ID" })
        } catch (err) {
            return res.status(400).json(err.message);
        }
    },

    //add a friend
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId,
                { $addToSet: { friends: req.params.friendId } }, { new: true })
            if (user) {
                return res.status(201).json(user)
            }
            return res.status(404).json({ message: "No user with that ID" })
        } catch (err) {
            return res.status(500).json(err.message)
        }
    },

    //delete friend
    async deleteFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId,
                { $pull: { friends: req.params.friendId } }, { new: true })
            if (user) {
                return res.status(201).json(user)
            }
            return res.status(404).json({ message: "No user with that ID" })
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }
}