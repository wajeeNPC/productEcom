const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        // Check if the origin is in the allowedOrigins list or if there is no origin (for non-browser requests)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);// If allowed, proceed with the request
        } else {
            callback(new Error('Not allowed by CORS'));// If not allowed, block the request and return an error
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,// Set the status code for successful pre-flight OPTIONS requests
};

module.exports = corsOptions;