/**
 * Error handling middleware
 */

// 404 Not Found handler
const notFoundHandler = (req, res, next) => {
    res.status(404).render('error', {
        title: 'Page Not Found',
        statusCode: 404,
        message: 'The page you are looking for does not exist.',
    });
};

// Global error handler
const globalErrorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err.stack || err.message);

    const statusCode = err.statusCode || 500;
    const message =
        process.env.NODE_ENV === 'production'
            ? 'Something went wrong. Please try again later.'
            : err.message || 'Internal Server Error';

    res.status(statusCode).render('error', {
        title: 'Error',
        statusCode,
        message,
    });
};

module.exports = { notFoundHandler, globalErrorHandler };
