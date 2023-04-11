const { User, Thought } = require('../models');

module.exports = {
    //THIS FUNCTION QUERIES THE DATABASE FOR ALL THOUGHTS, THEN SENDS THE RESULT AS A JSON RESPONSE, OR AN ERROR RESPONSE IF THERE'S A DATABASE ERROR.
    getThoughts(req, res) {
        Thought.find()
            .then(async (thoughts) => {
                return res.json(thoughts);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //RETRIEVE A SINGLE THOUGHT BY ID, HANDLE ERRORS.
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this ID' })
                    : res.json({
                        thought
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //CREATE A NEW THOUGHT AND ASSOCIATE IT WITH A USER IN THE DATABASE
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => {
                return User.findOneAndUpdate(
                    { userName: req.body.userName },
                    { $push: { thoughts: thoughtData._id } },
                    { runValidators: true, new: true }
                )
            })
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ "message": "No user found with this username." });
                }
                else {
                    res.json({ message: 'Thought sucessfully created', userData: userData });
                }
            })
            .catch((err) => res.status(500).json(err));
    },
    //UPDATE A THOUGHT BY ID IN THE DATABASE.
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //DELETE A THOUGHT AND REMOVE ITS REFERENCE FROM THE USER DOCUMENT IF IT EXISTS.
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id' })
                }
                return User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
            })
            .then((userData) => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user found' })
                }
                res.json({ message: 'thought sucessfully deleted' })
            })
            .catch((err) => res.status(500).json(err));
    },
    //ADD A REACTION TO A THOUGHT.
    addReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with this ID ' })
                    : res.json({ message: 'Reaction sucessfully added', thought: thought })
            )
            .catch((err) => res.status(500).json(err));
    },
    //DELETE A REACTION FROM A THOUGHT.
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with this ID ' })
                    : res.json({ Message: 'Reaction sucessfully deleted', thought: thought })
            )
            .catch((err) => res.status(500).json(err));
    },
};