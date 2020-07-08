exports.checkID = (req, res, next, val) => {
  // param middleware function gets access to a fourth argument- val
  // this is a kind of local mini application, will not work for users as it is defined in tourController
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > 10) {
    // tours.length
    return res.status(404).json({
      // return finishes the req res cycle and response is send
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: 'tours.length',
    data: 'tours', // envelope to mitigate security issues
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  //const tour = tours.find(el => el.id === id);
  res.status(200).json({
    status: 'success',
    data: 'tour',
  });
};

exports.createTour = (req, res) => {
  // response is sent, no need for next
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Created tour here...>',
    },
  });
};

exports.updateTour = (req, res) => {
  // response is sent, no need for next
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  // response is sent, no need for next
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
