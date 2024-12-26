require('dotenv').config()
const express = require('express')
const app = express()
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connection = require('./db')
const productRoutes = require('./routes/productRoutes');

//database
connection()


//middlewares
app.use(express.json())
app.use(cors(corsOptions));

//routes
app.use("/api/products", productRoutes)

const port = 4040;
app.listen(port, ()=> console.log(`Listening on port ${port}...`))
