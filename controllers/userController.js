const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // Send Response
  res.status(200).json({
    status: 'success',
    result: users.length,
    data: users, // envelope to mitigate security issues
  });
});

exports.getUser = (req, res) => {
  //const id = req.params.id * 1;
  //const tour = users.find(el => el.id === id);
  res.status(200).json({
    status: 'success',
    data: 'user',
  });
};

exports.createUser = (req, res) => {
  // response is sent, no need for next
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Created user here...>',
    },
  });
};

exports.updateUser = (req, res) => {
  // response is sent, no need for next
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated user here...>',
    },
  });
};

exports.deleteUser = (req, res) => {
  // response is sent, no need for next
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
