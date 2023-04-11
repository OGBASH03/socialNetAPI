const { User, Thought } = require('../models');

module.exports = {
    //RETURN ALL USERS IN DATABASE.
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                return res.json(users);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //GET A SINGLE USER BY ID, INCLUDING THOUGHTS AND FRIENDS.
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends')
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this ID' })
                    : res.json({
                        user
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //UPDATE AN USER IN THE DATABASE AND RETURN THE UPDATED USER OR A MESSAGE IF NO USER IS FOUND.
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    //ADDING A FRIEND TO AN USER DOCUMENT AND RETURNING THE UPDATED USER WITH THE NEW FRIEND ADDED.
    addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.params);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: { _id: req.params.friendId } } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with this ID ' })
                    : res.json({ message: "Friend sucessfully added", user: user })
            )
            .catch((err) => res.status(500).json(err));
    },
    //FRIEND REMOVAL FUNCTION IN ALL CAPS: "UNFRIENDING PROCESS COMPLETED"
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with this ID ' })
                    : res.json({ message: "Friend sucessfully deleted", user: user }))

            .catch((err) => res.status(500).json(err));
    },
};
