const fs = require('fs');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });

const Tour = require('./models/tourModel');
const User = require('./models/userModel');
const Review = require('./models/reviewModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log('DB connection successful...'));

const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours.json'),
  'utf-8'
);
const users = JSON.parse(
  fs.readFileSync('./dev-data/data/users.json'),
  'utf-8'
);
const reviews = JSON.parse(
  fs.readFileSync('./dev-data/data/reviews.json'),
  'utf-8'
);

// Import Data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false }); // to turn off validators because saving users without validating, also turn off all the middlewares in userModel to skip encrypting password and validating password
    await Review.create(reviews);

    console.log('Data successfully loaded...');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    console.log('Data successfully deleted...');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
