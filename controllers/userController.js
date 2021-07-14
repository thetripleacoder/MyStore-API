// model
const User = require('../models/userModel');

// libraries
const bcrypt = require('bcrypt');

// controller
const auth = require('../auth');

// controller modules
module.exports.register = (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let address = req.body.address;
  let email = req.body.email;
  let password = req.body.password;
  let mobileNo = req.body.mobileNo;

  if (
    firstName != '' &&
    lastName != '' &&
    address != '' &&
    email != '' &&
    password != '' &&
    mobileNo != '' &&
    firstName != null &&
    lastName != null &&
    address != null &&
    email != null &&
    password != null &&
    mobileNo != null &&
    firstName != undefined &&
    lastName != undefined &&
    address != undefined &&
    email != undefined &&
    password != undefined &&
    mobileNo != undefined
  ) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    let newUser = new User({
      firstName: firstName,
      lastName: lastName,
      address: address,
      email: email,
      password: hashedPassword,
      mobileNo: mobileNo,
    });

    newUser
      .save()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.send({
      message: 'All fields are required!',
    });
  }
};

module.exports.login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({ email: email })
    .then((foundUser) => {
      if (foundUser == null) {
        res.send({
          message: 'User Not Found!',
        });
      } else {
        const isPasswordCorrect = bcrypt.compareSync(
          password,
          foundUser.password
        );
        if (isPasswordCorrect) {
          //user is authenticated
          res.send({ accessToken: auth.createAccessToken(foundUser) });
        } else {
          res.send({
            message: 'Incorrect password!',
          });
        }
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.getUserDetails = (req, res) => {
  let userId = req.user.id;
  User.find({ _id: userId })
    .then((foundUser) => {
      res.send({ data: foundUser });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.updateUserDetails = (req, res) => {
  let updates = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    mobileNo: req.body.mobileNo,
  };
  let options = {
    new: true,
  };

  return User.findByIdAndUpdate(req.user.id, updates, options)
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((result) => {
      res.send({ data: result });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.setUserAsAdmin = (req, res) => {
  let userId = req.params.userId;
  User.findOne({ _id: userId })
    .then((result) => {
      if (!result.isAdmin) {
        result.isAdmin = true;
        result
          .save()
          .then((updatedUser) => {
            res.send({
              Message: 'User granted admin access successfully!',
              updatedUser: updatedUser,
            });
          })
          .catch((err) => {
            res.send(err);
          });
      } else {
        res.send({ Message: 'User has already been granted an admin access!' });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};
