const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const timeStamp = require('../utils/timeStamp');

//DEFINE A SCHEMA FOR THOUGHTS THAT INCLUDES TEXT, DATE, USERNAME, AND REACTIONS AS AN ARRAY OF NESTED DOCUMENTS USING A REACTION SCHEMA.
const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280 
      },
      createAt: {
        type: Date,
        default: Date.now,
        get: timestamp => timeStamp(timestamp) //FORMATS THE TIMESTAMP ON QUERY USING A GETTER METHOD.        
      },
      userName: {
        type: String,
        required: true,
      },
      
      //DEFINES A MONGOOSE SCHEMA FOR A THOUGHT DOCUMENT WITH AN ARRAY OF NESTED DOCUMENTS CREATED USING ANOTHER SCHEMA AND INCLUDES OPTIONS FOR JSON SERIALIZATION.
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        getters: true,
        virtual: true,
      },
    }
  );
  thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  
  const Thought = model('Thought', thoughtSchema);
  
  module.exports = Thought;