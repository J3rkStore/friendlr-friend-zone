const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
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

module.exports = router;
