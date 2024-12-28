const mongoose = require("mongoose");

module.exports = () => {
  try {
    mongoose.connect(process.env.DBurl); // Attempt to connect to the MongoDB database using the URL from the environment variables
    console.log("connected to database succesfully");
  } catch (error) {
    console.log(error);
    console.log("could not connect to database");
  }
};
