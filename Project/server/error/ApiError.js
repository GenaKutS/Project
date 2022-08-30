const crypto = require("crypto");
const { random } = require("../db");
class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.id = crypto.randomUUID;
    this.statusCode = statusCode;
    this.title = title;
    this.detail = detail;
  }
  static badRequest() {
    this.id,
      (this.statusCode = 400),
      (this.title = "Bad request. Request has wrong format."),
      (this.detail =
        "Код состояния ответа HTTP 400 Bad Request указывает, что сервер не смог понять запрос из-за недействительного синтаксиса");
  }

  //   //tatic badRequest() {
  //     return new ApiError(404, message);
  //  // }

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
