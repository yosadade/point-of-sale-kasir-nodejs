// controllers/usersController.js
const db = require("../models");

exports.createUser = (req, res) => {
  console.log("Request body:", req.body);
  const { username, email, password } = req.body;

  db.User.create({ username, email, password })
    .then((user) => res.status(201).json(user))
    .catch((error) => {
      console.error("Error creating user:", error.message);
      res.status(500).json({ message: error.message });
    });
};

exports.getAllUsers = (req, res) => {
  db.User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => {
      console.error("Error fetching users:", error.message);
      res.status(500).json({ message: error.message });
    });
};

exports.getUserById = (req, res) => {
  console.log("Request params:", req.params);
  db.User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error("Error fetching user:", error.message);
      res.status(500).json({ message: error.message });
    });
};

exports.updateUser = (req, res) => {
  console.log("Request params:", req.params);
  console.log("Request body:", req.body);
  const { username, email, password } = req.body;

  db.User.update(
    { username, email, password },
    {
      where: { id: req.params.id },
    }
  )
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated" });
    })
    .catch((error) => {
      console.error("Error updating user:", error.message);
      res.status(500).json({ message: error.message });
    });
};

exports.deleteUser = (req, res) => {
  console.log("Request params:", req.params);
  db.User.destroy({
    where: { id: req.params.id },
  })
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted" });
    })
    .catch((error) => {
      console.error("Error deleting user:", error.message);
      res.status(500).json({ message: error.message });
    });
};
