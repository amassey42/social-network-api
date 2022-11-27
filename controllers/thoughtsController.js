const { ObjectId } = require('mongoose').Types;
const { User, Thought, reactionSchema } = require('../models');


module.exports = {

    //get all thoughts
    async getThoughts(req, res) {
        try {
            const allThoughts = await Thought.find();
            return res.status(200).json(allThoughts)
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    //get one thought by ID
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.id)
            if (!thought) {
                return res.status(400).json({ message: "Can't find thought with that ID" })
            }
            return (res.status(200).json(thought));
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //create a thought
    async createThought(req, res) {
        Thought.create(req.body).then((post) => res.json(post))
            .catch((err) => res.status(500).json(err))
    },

    //update a thought
    async updateThought(req, res) {
        try {
            const updateThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
            return updateThought ? res.status(200).json(updateThought) : res.status(404).json({ message: "Can't find thought with that ID" })
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    //delete a thought
    async deleteThought(req, res) {
        try {
            const deleteThought = await Thought.findByIdAndDelete(req.params.id)
            return deleteThought ? res.status(200).json({ message: 'Thought deleted' }) : res.status(404).json({ message: "Can't find thought with that ID" })
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    //create a reaction
    async createReaction(req, res) {
        try {
            const reaction = req.body;
            const thought = await Thought.findByIdAndUpdate(req.params.id, { $addToSet: { reactions: req.body } }, { new: true })
            if (thought) {
                return res.status(200).json(thought);
            } else {
                return res.status(404).json({ message: "Can't find thought with that ID" })
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    //delete a reaction
    async deleteReaction(req,res){
        try{
            const deleteReaction = await Thought.findByIdAndUpdate(req.params.thoughtId, {$pull: {reactions: {_id:req.params.reactionId}}}, {new:true})
            if (deleteReaction) {
                return res.status(200).json(deleteReaction);
            } else {
                return res.status(404).json({ message: "Can't find thought with that ID" })
            }
        } catch (err){
            return res.status(500).json(err)
        }
    }
}