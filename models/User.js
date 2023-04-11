const { Schema, model } = require('mongoose');

//DEFINES A USER SCHEMA WITH USERNAME, EMAIL, THOUGHTS, AND FRIENDS FIELDS, INCLUDING A VIRTUAL PROPERTY TO CALCULATE THE NUMBER OF FRIENDS.
const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']


        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
