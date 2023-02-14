const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors')
const path = require('path');
require('dotenv').config()

const app = express();

app.use(cors())

// import routes
const authRoutes = require('./src/routes/auth')
const postRoutes = require('./src/routes/post')

// Middlewares
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(morgan('tiny'))

const validateToken = require('./src/middleware/verifyToken')
const getRouter = require('./src/routes/geter')

// Routes
app.use("/auth", authRoutes)
app.use("/post", postRoutes)
app.use("/get", getRouter)
app.use('/images', express.static(path.join(__dirname, '/public/images')))

// Conexión a Base de datos
const connectToMongoDB = require('./src/database/database');
connectToMongoDB();


// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running in: ${PORT}`)
})
