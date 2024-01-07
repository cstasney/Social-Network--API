const { Schema, Model } = require('mongoose');
const thoughtSchema = require('./Thoughts')

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            max_lenth: 20,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validation: {
                
            }
        }

    }
)