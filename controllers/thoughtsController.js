const { restart } = require('nodemon')
const { Thoughts, Users } = require('../models')

module.exports = {

    async getThoughts(req, res) {
        try {
            const thought = await Thoughts.find()

            res.json(thought)
        } catch (err) {
            res.status(500).json
        }
    },

    async getOneThought(req, res) {
        try {
            const thought = await Thoughts.findOne({ _id: req.params.thoughtId })
                .populate({ path: 'reactions'})

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
            const userData = await Users.findOneAndUpdate(
                { _id: req.params.userId},
                { $push: { thoughts: thought._id}},
                { new: true}
            )
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true }
            )
                .populate({ path: 'reactions'})

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
            const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId })

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID!' })
            }

            // const thoughts = user.thoughts;
            const user = await Users.findOneAndUpdate( 
                { thoughts: req.params.thoughtId},
                { $pull: { thoughts: req.params.thoughtId }},
                { new: true }
            )

            if(!user) {
                res.status(404).json({ message: 'User Id invalid' })
            }

            res.json({ message: 'Thought deleted!' })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async addReaction(req, res) {
        try {
            const reaction = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )

            if (!reaction) {
                return res.status(404).json({ message: 'Thought ID invalid!' })
            }

            res.json(reaction)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteReaction(req, res) {
        try {
            const reaction = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
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