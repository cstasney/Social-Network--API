const { restart } = require('nodemon')
const { Thoughts, Users } = require('../models')

module.exports = {

    async getThoughts(req, res) {
        try {
            const thought = await Thoughts.find()
                .populate({ path: 'reactions', select: '__v' })
                .select('__v')

            res.json(thought)
        } catch (err) {
            res.status(500).json
        }
    },

    async getOneThought(req, res) {
        try {
            const thought = await Thoughts.findOne({ _id: req.params.thoughtId })
                .populate({ path: 'reactions', select: '__v' })
                .select('__v')

            if (!thought) {
                return res.status(400).json({ message: 'Thought ID does not exist!' })
            }

            res.json(thought)

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thoughts.create(req.body)
            const user = await Users.findOneAndUpdate({ _id: req.params.userId },
                { $push: { thoughts: _id } },
                { new: true });

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID!' })
            }

            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtId },
                { new: true, runValidators: true })
                .populate({ path: 'reactions', select: '__v' })
                .select('__v')

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID!' })
            }

            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtiD })

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID!' })
            }

            res.json({ message: 'Thought deleted!' })
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async addReaction(req, res) {
        try {
            const reaction = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            )
                .populate({ path: 'reactions', select: '-__v' })
                .select('-__v')

            if (!reaction) {
                return res.status(404).json({ message: 'Thought ID invalid!' })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteReaction(req, res) {
        try {
            const reaction = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtId },
                { $pull: { reactions: req.params.reactionId } },
                { new: true, runValidators: true }
            )

            if (!reaction) {
                res.status(404).json({ message: 'Invalid Thought ID!' })
            }

            res.json({ message: 'Reaction deleted!' })
        } catch (err) {
            res.status(500).json(err)
        }
    }
}