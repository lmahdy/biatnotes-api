const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {//if the logs directory does not exist, the method creates it. logs means that the logs directory exists, the method creates it. If the logs directory does not exist, the method creates it.
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)//if the logs directory exists, the method appends the log item to the specified log file.
    } catch (err) {
        console.log(err)
    }
}// this method is used to log events and request information in a file. The method takes as parameters the event or request information to be logged and the name of the log file. The method creates a log item that contains the current date and time, a unique identifier, and the event or request information. The method then appends the log item to the specified log file.

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}// this method is used to log request information in a file and to log the request method and path in the console. The method takes as parameters the request object, the response object, and the next function. The request object contains information about the HTTP request. The response object is used to send a response to the client. The next function is used to call the next middleware function in the stack.

module.exports = { logEvents, logger }
//logging mechanism to capture and store event and request information in a file, enabling debugging and monitoring of the application.
