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

  User.findOne({ email: email })
    .then((foundUser) => {
      if (foundUser) {
        res.send({
          message: 'Email is already taken!',
        });
      } else {
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
              res.send({message: "Registration Successful!", data: {user}});
            })
            .catch((err) => {
              res.send(err);
            });
        } else {
          res.send({
            message: 'All fields are required!',
          });
        }
      }
  })
    .catch((err) => {
      res.send(err);
    });
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
    .select('firstName lastName address email mobileNo -_id')
    .then((foundUser) => {
      res.send({ message: 'Profile Information', data: foundUser });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.updateUserDetails = (req, res) => {
  let userId = req.user.id;

  let options = {
    new: true,
  };

  User.findByIdAndUpdate(userId, req.body, options)
    .select('firstName lastName address email mobileNo -_id')
    .then((updatedUser) => {
      res.send({ message: 'Profile updated successfully!', data: updatedUser });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((result) => {
      res.send({ message: 'List of all Users/Admins', data: result });
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
