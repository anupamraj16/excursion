// this file will host database configurations, error handling, environment variables
// environment variables are global variables that are used to define the environment in which a node app is running
// node.js and express set a lot of environment variables
// env variable is set by express. node.js sets these and can be seen at process.env, these variales come from process core module
// env variables can be added to process.env by defining them in config.env file

const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Connects the app with the config.env file
dotenv.config({ path: './config.env' }); // Shows the file path
const app = require('./app'); // this line should be after the above line so that environment variables are included in the process.env before getting access to app file

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateindex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB Connection successful...'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
