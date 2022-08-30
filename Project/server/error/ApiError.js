class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(404, message);
  }

  static internral(message) {
    return new ApiError(500, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }

  static wrongOperation(message) {
    return new ApiError(409, message);
  }
  static NotFound(message) {
    return new ApiError(404, message);
  }
}
module.exports = ApiError;
