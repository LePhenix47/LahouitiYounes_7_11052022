const express = require("express");
const helmet = require("helmet");
const dotEnv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");

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

//Synchroniser les modèles & la B2D
const db = require("./models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

//Routes
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;