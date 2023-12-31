const express = require('express')
const trainings = require('./routes/trainings')
const errorHandler = require('./middlewares/error')
require('dotenv').config() // A .env fájlt olvassanp



const app = express()


const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log(`Database Connected ${database.host}`);
});

app.use(express.json())

const morgan = require('morgan')

app.use(morgan('dev'))


app.use('/api/trainings', trainings)

app.use(errorHandler)  // Fontos a sorrend!

app.listen(process.env.PORT, console.log(`Server running on port ${process.env.PORT}`));
