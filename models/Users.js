const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            maxlength: 20,
            trim: true
        },
        email: {
            type: String, 
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

usersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const Users = model('Users', usersSchema);

module.exports = Users;