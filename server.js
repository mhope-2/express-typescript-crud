const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');


// get env variables
dotenv.config({
    path:'./config/.env'
});

// mongoose for db connection
const connectDB = require('./config/db');
connectDB()


const app = express()
app.use(cors());
app.use(express.json());

// routes
const exercisesRouter = require('./routes/exercises.route');
const usersRouter = require('./routes/users.route');

app.use('/users', usersRouter)
app.use('/exercises', exercisesRouter)


const PORT = process.env.PORT || 5000

const server = app.listen(PORT,console.log(`Server Running On Port:${PORT}`));







