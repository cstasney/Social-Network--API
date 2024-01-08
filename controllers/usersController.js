const { ObjectId } = require('mongoose').Types;
const { Users, Thoughts } = require('../models')

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await Users.find()
            res.json(users)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async getOneUser(req, res) {
        try {
            const user = await Users.findOne({ _id: req.paramas.userId })
                .populate([
                    { path: 'thoughts', select: "-__v" },
                    { path: 'friends', select: "-__v" }
                ])
                .select('-__v');

            res.json(user)

            if (!user) {
                res.status(400).json({ message: 'No user found with that ID' })
            }

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async createUser(req, res) {
        try {
            const user = await Users.create(req.body);
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'Users account and thoughts deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'Users account and thoughts changed!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
};