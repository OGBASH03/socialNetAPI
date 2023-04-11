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