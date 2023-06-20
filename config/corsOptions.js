const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {//if the origin is in the allowedOrigins array or if the origin is not specified, the callback function is called with null and true as arguments, which means that the request is allowed. If the origin is not in the allowedOrigins array, the callback function is called with an error as the first argument, which means that the request is not allowed.
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}//this method is used to enable CORS for all routes in the application and to allow requests from the specified origins. The method also enables the use of cookies and sets the status code for successful OPTIONS requests to 200.

module.exports = corsOptions 