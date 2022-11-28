const { Schema, model } = require('mongoose');
const Mongoose = require('mongoose')
const moment = require('moment');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema (
    {
        thoughtText:{
            type:String,
            required:true,
            minLength:1,
            maxLength: 280,
            trim:true
        },
        createdAt:{
            type:Date,
            default: Date.now(),
            get: value =>{
                return moment(value).local().format('MMM Do YYYY, h:mm:ss a');
            }
        },
        username:{
            type: String,
            required:true,
        },
        reactions: [
            reactionSchema
        ]
    },
    {
        toJSON:{
            virtuals:true
        },
        id:false
    }
);

thoughtSchema.virtual('reactionCount')
.get(function(){
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;