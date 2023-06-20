const { logEvents } = require('./logger')

const errorHandler = (err, req, res, next) => {// it take as parameters the error object, the request object, the response object, and the next function. The error object contains the error message and stack trace. The request object contains information about the HTTP request that caused the error. The response object is used to send a response to the client. The next function is used to call the next middleware function in the stack.
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    console.log(err.stack)

    const status = res.statusCode ? res.statusCode : 500 // server error 

    res.status(status)

    res.json({ message: err.message, isError: true })
}//this method is used to handle errors that occur in the application and provide appropriate responses to the client. The method logs the error message and stack trace and sends a JSON response with the error message and status code to the client.

module.exports = errorHandler 