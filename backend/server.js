require("dotenv").config(); // Loads environment variables from .env file
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connection = require("./db");
const productRoutes = require("./routes/productRoutes");

const multer = require("multer");
const path = require("path");

//database
connection(); // Establish a connection to the database

//middlewares
app.use(express.json());
app.use(cors(corsOptions)); // Apply CORS with custom options

//routes
app.use("/api/products", productRoutes);

const port = 4040;
app.listen(port, () => console.log(`Listening on port ${port}...`));
