const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");
const User = require("../../models/User");

// /api/users
router.route("/").get(getUsers).post(createUser);

// example for createUser post
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
//   }

// /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
