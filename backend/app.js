const express = require("express");
const helmet = require("helmet");
const dotEnv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");

//Connects to the PostgreSQL database
let connectToDatabase = async () => {
  const { Client } = require("pg");
  const client = new Client();
  await client.connect();
  const res = await client.query("SELECT $1::text as message", [
    "Attempting to connect with the database",
  ]);
  console.log(res.rows[0].message); //Logs the 1st message
  await client.end();
};

//Configures the environment variables to avoid getting sensible data stolen from GitHub
dotEnv.config();

const app = express();

//Makes it so that everyone has access to our API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//To have access to the body of the request by intercepting all requests with a JSON mimetype
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

//Library that protects the headers of the requests and from XSS attacks
app.use(helmet());

//Routes
const userRoutes = require("./routes/user.route");

app.use("/api/auth", userRoutes);

module.exports = app;
