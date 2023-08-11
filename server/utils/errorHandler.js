const errorHandler = (err, req, res, next) => {
    // Log the error for debugging purposes
    console.error(err);
  
    // Default error status and message
    let statusCode = 500;
    let message = 'Internal Server Error';
  
    // Customize error handling based on error type
    if (err.name === 'ValidationError') {
      // Handle Mongoose validation errors
      statusCode = 400;
      message = err.message;
    } else if (err.name === 'UnauthorizedError') {
      // Handle unauthorized errors (e.g., JWT authentication)
      statusCode = 401;
      message = 'Unauthorized';
    }
    // Add more customized error handling as needed
  
    // Send the error response to the client
    res.status(statusCode).json({ success: false, error: message });
  };
  
  module.exports = errorHandler;
  