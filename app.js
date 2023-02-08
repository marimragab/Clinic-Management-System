const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

const appointmentRoute = require("./Routes/appointment");
const medicineRoute = require("./Routes/medicine");
const employeeRoute = require("./Routes/employee");
const ServicesRoute = require("./Routes/clinicServices");
const prescriptionRoute = require("./Routes/prescription");
const invoiceRoute = require("./Routes/invoice");

// const authRoute = require("./Controllers/authentication");
// const authenticationMW = require("./Middlewares/authenticationMW");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(
  "/dental-clinic-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

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
    // adding socket.io to use on notify doctor with new appointment
    // const io = require("socket.io")(server);
    // io.on("connection", (socket) => {
    //   console.log("Client Connected ");
    // });
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
app.use(appointmentRoute);
app.use(medicineRoute);
app.use(employeeRoute);
app.use(ServicesRoute);

app.use(prescriptionRoute);
app.use(invoiceRoute);

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
