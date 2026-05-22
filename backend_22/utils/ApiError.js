// class ApiError extends Error {
//   constructor(statusCode, message) {
//     super(message);
//     this.statusCode = statusCode;
//   }
// }

// module.exports = ApiError;
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
  }
}

module.exports = ApiError;
