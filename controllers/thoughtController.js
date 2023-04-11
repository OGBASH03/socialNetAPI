const { User, Thought } = require('../models');

module.exports = {
    //
    getToughs(req, res) {
      Thought.find()
            .then(async (thougts) => {
            })
         .catch((err) => {
         console.log(err);
         return res.status(500).json(err);
         });
    },
}   