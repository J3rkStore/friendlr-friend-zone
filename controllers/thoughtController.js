const { User, Thought, Reaction } = require("../models");

module.exports = {
  //GET ALL THOUGHTS
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      console.log(thoughts);
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //GET SINGLE THOUGHT
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      console.log(thought);
      if (!thought) {
        return res.status(404).json({ message: "no thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //CREATE THOUGHT
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        {
          username: req.body.username,
          //_id: req.body.userId,
          thoughts: { $ne: thought._id },
        },
        {
          $push: { thoughts: thought._id },
        },
        {
          new: true,
          unique: true,
        }
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      res.json({ message: `reaction added to ${thought}` });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE THOUGHT
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "no thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE THOUGHT
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(404).json({ message: "no thought with that ID" });
      }
      res.json({ message: "thought deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //CREATE REACTION
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      res.json({ message: `reaction added to ${thought}` });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE REACTION
  async deleteReaction(req, res) {
    try {
      await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      res.json({ message: "reaction removed" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
