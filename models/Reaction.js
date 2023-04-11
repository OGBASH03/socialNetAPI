const { Schema, Types } = require('mongoose');
const timeStamp = require('../utils/timeStamp');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        userName: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => timeStamp(timestamp),
        } //DEFINE A DATE-TYPE FIELD WITH DEFAULT VALUE OF CURRENT DATE AND A CUSTOM GETTER FUNCTION TO FORMAT THE DATE.
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;