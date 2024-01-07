const { Schema, Model, Types } = require('mongoose')
const reactionsSchema = require('./Reactions')

const thoughtsSchema = new Schema(
    {
        thought: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
            timestamps: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionsSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)



thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

module.exports = Thoughts