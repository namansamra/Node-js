const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bootcamps = require("./routes/bootcamps");
const connectDB = require("./config/db");
const ErrorHandler = require("./middlewares/errorHandler");

// load env variables
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;

//logger middle ware -> it console.log the requests that any body make
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//mount routers
app.use("/api/v1/bootcamps", bootcamps);

//error handler middleware  after route mounting
app.use(ErrorHandler);
//basic route
app.get("/", (req, res) => {
  res.json({ msg: "welcome to camper api" });
});

const server = app.listen(process.env.PORT, () => {
  console.log("server running on port" + process.env.PORT);
});

//unhandled promise rejection {like we donot add try catch in connectmongo db so we handle that here}
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //close the server and exit process i.e-> if some rejections we want our app to crash and exit
  server.close(() => process.exit(1));
});
