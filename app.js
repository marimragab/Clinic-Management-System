const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const doctorRoute=require("./Routes/doctor");
const app = express();

const appointmentRoute = require("./Routes/appointment");
const prescriptionRoute = require("./Routes/prescription");
// const authRoute = require("./Controllers/authentication");
// const authenticationMW = require("./Middlewares/authenticationMW");

require("dotenv").config();
let port = process.env.PORT || 8080;

mongoose.set("strictQuery", true);
const dbURL = `${process.env.DB_URL}`;
mongoose
  .connect(dbURL)
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`App listens on http://localhost:${port}`);
    });
    // adding socket.io to use on notify doctor with new appointment
    const io = require("socket.io")(server);
    io.on("connection", (socket) => {
      console.log("Client Connected ");
    });
  })
  .catch((error) => {
    console.log("DB Connection Error", error);
  });

app.use(morgan(":method :url :response-time"));
app.use(express.json());

//register (who can register on our system?)
// app.use(authRoute.login);
// app.use(authenticationMW);
//Routes
app.use(doctorRoute);
app.use(appointmentRoute);
app.use(prescriptionRoute);

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
