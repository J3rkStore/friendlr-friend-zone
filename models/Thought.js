const { Schema, model, Types } = require("mongoose");
//const reactionSchema = require("./Reaction");

const reactionSchema = new Schema({
  // reactionId: {
  //   type: Schema.Types.ObjectId,
  // },
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

const thoughtSchema = new Schema(
  {
    // thoughtID: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId(),
    // },
    thoughtText: {
      type: String,
      required: true,
      //TODO: needs to be between 1 and 280 characters
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      //TODO: Use a getter method to format the timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

//getter function.  Also a 'virtual'

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Reaction = reactionSchema;
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
