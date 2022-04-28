const express = require("express");
const app = express();

var cors = require("cors");

const routes = require("./routes.js");

var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:4200", // * changed to url for file upload
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
app.use(express.json());
app.use("/", routes);

app.listen(3000, () => {
  console.log(`SERVER IS UP AND RUNNING AT http://localhost:${3000}`);
});
