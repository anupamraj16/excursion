// this file will host database configurations, error handling, environment variables
// environment variables are global variables that are used to define the environment in which a node app is running
// node.js and express set a lot of environment variables
// env variable is set by express. node.js sets these and can be seen at process.env, these variales come from process core module
// env variables can be added to process.env by defining them in config.env file

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });

const app = require('./app'); // this line should be after the above line so that environment variables are included in the process.env before getting access to app file

// Create DataBase Connection URL with Password
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Connect to DB and Turn Off Deprication Warnings
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log('DB connection successful...'));

const port = process.env.PORT || 3000;

// Start Server
app.listen(port, () => {
  console.log(`Server running at port ${port}...`);
});
