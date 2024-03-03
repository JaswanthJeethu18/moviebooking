const User = require("../models/user.model.js");
const uuid = require("uuid");

// Create and Save a new User
exports.signUp = (req, res) => {
  // Create a User
  const user = new User({
    username: req.body.first_name + req.body.last_name,
    password: req.body.password,
    uuid: uuid.v4(),
    access_token: "",
    isLoggedIn: false,
  });

  // Save User in the database
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Login a user
exports.login = (req, res) => {
  User.findOne({
    username: req.body.username,
    password: req.body.password,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with username " + req.body.username,
        });
      }
      user.isLoggedIn = true;
      user.save();
      res.send(user);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving user with username " + req.body.username,
      });
    });
};

// Logout a user
exports.logout = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      user.isLoggedIn = false;
      user.save();
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId,
      });
    });
};

// Get coupon code for a user
exports.getCouponCode = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send({ couponCode: user.couponCode });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId,
      });
    });
};

// Book a show for a user
exports.bookShow = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      const bookingRequest = {
        reference_number: req.body.reference_number,
        coupon_code: req.body.coupon_code,
        show_id: req.body.show_id,
        tickets: req.body.tickets,
      };
      user.bookingRequests.push(bookingRequest);
      user
        .save()
        .then((updatedUser) => {
          res.send(updatedUser);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while booking the show.",
          });
        });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId,
      });
    });
};
