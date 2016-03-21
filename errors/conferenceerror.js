/**
 * `ConferenceError` error.
 *
 * @api private
 */
function ConferenceError(message, status) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.name = 'ConferenceError';
    this.message = message;
    this.status = status || 500;
}

/**
 * Inherit from `Error`.
 */
ConferenceError.prototype.__proto__ = Error.prototype;


/**
 * Expose `ConferenceError`.
 */
module.exports = ConferenceError;
