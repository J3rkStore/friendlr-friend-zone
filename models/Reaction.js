const { Schema, model, Types } = require("mongoose");

//not a model, just a schema

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
  },
  reactionBody: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Reaction = model("reaction", reactionSchema);
module.exports = Reaction;
