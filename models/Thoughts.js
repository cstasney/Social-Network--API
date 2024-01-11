const { Schema, model } = require('mongoose')
const reactionsSchema = require('./Reactions')

const thoughtsSchema = new Schema(
    {
        thought: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,

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
        timestamps: true,
        toJSON: {
            // getters: true,
            virtuals: true
        },
        id: false
    }
)



thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thoughts = model('Thoughts', thoughtsSchema)

module.exports = Thoughts