const mongoose = require("mongoose");
const dotenv = require("./config.env");

const connectDb = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  console.log("connected to database successfully");
};

module.exports = connectDb;
