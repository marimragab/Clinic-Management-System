const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

const appointmentRoute = require("./Routes/appointment");
const employeeRoute = require("./Routes/employee");
const ServicesRoute = require("./Routes/clinicServices");

require("dotenv").config();
let port = process.env.PORT || 8080;

mongoose.set("strictQuery", true);
const dbURL = `${process.env.DB_URL}`;
mongoose
  .connect(dbURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`App listens on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("DB Connection Error", error);
  });

app.use(morgan(":method :url :response-time"));
app.use(express.json());

//Routes
app.use(appointmentRoute);
app.use(employeeRoute);
app.use(ServicesRoute);


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
