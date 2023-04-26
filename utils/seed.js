const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});
  console.log("connected");
  const users = [
    {
      username: "dave",
      email: "dave@dave.com",
      // thoughts: [
      //   {
      //     thoughtText:
      //       "hey hey it's Fenriz.  I hope you're having a good Friday",
      //   },
      //   {
      //     thoughtText: "hey hey hey hey hey",
      //   },
      // ],
    },
    {
      username: "dave2",
      email: "dave2@dave.com",
    },
    {
      username: "dave3",
      email: "dave3@dave.com",
    },
  ];
  await User.collection.insertMany(users);
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
