const mongoose = require("mongoose");

const connectDatabase = () => {
  // mongoose.connect("mongodb+srv://itsusmanahmad00:sp7x46V6U7QbTMRC@cluster1.picel40.mongodb.net/?retryWrites=true&w=majority",
  // mongoose.connect("mongodb://127.0.0.1:27017/eCattle",
  // mongoose.connect("mongodb://127.0.0.1:27017/final",
  mongoose
    .connect(
      "mongodb+srv://itsusmanahmad00:t3VulL1yFXffspFy@cluster0.nooqfwc.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((data) => {
      console.log(
        `Successfully connected to database at Server : ${data.connection.host}`
      );
    })
    .catch((err) => {
      console.log(`Error connecting to database: ${err.message}`);
    });
};

module.exports = connectDatabase;
