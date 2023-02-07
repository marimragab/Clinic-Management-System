const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const doctorRoute=require("./Routes/doctor");
const app = express();


require("dotenv").config();
let port = process.env.PORT || 8080;

mongoose.set("strictQuery", true);
const dbURL = `${process.env.DB_URL}`;
mongoose
  .connect(dbURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`App listens on http://127.0.0.1:${port}`);
    });
  })
  .catch((error) => {
    console.log("DB Connection Error", error);
  });

app.use(morgan(":method :url :response-time"));
app.use(express.json());

//Routes
app.use(doctorRoute);

// Not Found Middleware
app.use((request, response, next) => {
  response.status(404).json({ message: "Endpoint not found." });
});


//Error Middleware
app.use((error, request, response, next) => {
  const status = error.status || 500;
  response
    .status(status)
    .json({ Message: "Internal Error", details: error.message });
});
