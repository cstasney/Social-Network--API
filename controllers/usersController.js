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
            const user = await Users.findOne({ _id: req.params.userId })
                .populate([
                    { path: 'thoughts' },
                    { path: 'friends' }
                ])

            if (!user) {
                return res.status(400).json({ message: 'No user found with that ID' })
            }

            res.json(user)
        } catch (err) {
            console.log(err)
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
            const user = await Users.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            const friends = user.friends;
            await Users.updateMany(
                { _id: { $in: friends } },
                { $pull: { friends: req.params.userId } }
            )

            await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'Users account and thoughts deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await Users.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { new: true, runValidators: true });

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await Users.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true, runValidators: true })

            if (!user) {
                return res.status(404).json({ message: 'No user found' })
            }

            const friend = await Users.findOneAndUpdate(
                { _id: req.params.friendId },
                { $addToSet: { friends: req.params.userId } },
                { new: true, runValidators: true }
            )

            if (!friend) {
                return res.status(404).json({ message: 'No user found with this ID' })
            }

            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteFriend(req, res) {
        try {

            const user = await Users.findOneAndUpdate(

                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true, runValidators: true })

            if (!user) {
                return res.status(404).json({ message: 'No user found' })
            }

            const friend = await Users.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: req.params.userId } },
                { new: true, runValidators: true })

            if (!friend) {
                return res.status(404).json({ message: 'No user found with this ID' })
            }

            res.json({ message: 'Friend deleted!' })
        } catch (err) {
            res.status(500).json(err)

        }
    }
}

