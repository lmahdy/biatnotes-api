require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)

app.use(cors(corsOptions))//cors middleware to enable CORS for all routes the point of using it is to enable CORS for all routes in the application.

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})// we use this middleware to handle 404 (Not Found) errors if the client requests a route that does not exist in the application.

app.use(errorHandler)//error handler middleware the point of using error handler middleware is to handle errors that occur in the application and provide appropriate responses to the client.

mongoose.connection.once('open', () => {//this method is used to listen for the open event that is emitted when the connection to the MongoDB database is established.
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})







/* create an Express.js server that includes middleware for logging, enabling CORS for all routes, handling JSON parsing, cookie parsing, serving static files, defining API routes, handling 404 (Not Found) errors, and implementing an error handler to handle errors that occur in the application and provide appropriate responses to the client. The server listens on a specified port and logs a message when it starts running.*/