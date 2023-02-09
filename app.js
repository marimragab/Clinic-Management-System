const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const doctorRoute = require("./Routes/doctor");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();

const appointmentRoute = require("./Routes/appointment");
const pationtRouter = require("./Routes/patient");
const medicineRoute = require("./Routes/medicine");
const employeeRoute = require("./Routes/employee");
const ServicesRoute = require("./Routes/clinicServices");
const prescriptionRoute = require("./Routes/prescription");
const invoiceRoute = require("./Routes/invoice");
const reportsRoute = require("./Routes/report");
const authRoute = require("./Routes/authentication");
const authenticationMW = require("./Middlewares/authenticationMW");
var Publishable_Key = "pk_test_F5UFRY9RCYM7ilRTAh55JQ";
var Secret_Key = "sk_test_Czcmd6nNU3PU0SUJkgt3tY";

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const stripe = require("stripe")(Secret_Key);

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
  })
  .catch((error) => {
    console.log("DB Connection Error", error);
  });

app.use(morgan(":method :url :response-time"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

app.use(authRoute);
app.use(authenticationMW);
//Routes
app.use(doctorRoute);
app.use(appointmentRoute);
app.use(pationtRouter);
app.use(medicineRoute);
app.use(employeeRoute);
app.use(ServicesRoute);
app.use(prescriptionRoute);
app.use(invoiceRoute);
app.use(reportsRoute);
app.get("/", function (req, res) {
  res.render("Home", {
    key: Publishable_Key,
  });
});

// Not Found Middleware
app.use((request, response, next) => {
  response.status(404).json({ message: "End point not found." });
});

//Error Middleware
app.use((error, request, response, next) => {
  const status = error.status || 500;
  response
    .status(status)
    .json({ Message: "Internal Error", details: error.message });
});
