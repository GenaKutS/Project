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

  static internral() {
    this.id,
      (this.statusCode = 500),
      (this.title = "Internal Server Error."),
      (this.detail =
        "Код состояния ответа HTTP 500 Internal Server Error указывает, на внутреннюю ошибку сервера");
  }

  static forbidden() {
    this.id,
      (this.statusCode = 403),
      (this.title = "Forbidden Error."),
      (this.detail =
        "Код состояния ответа HTTP 403 Forbidden Error указывает, на отсутствие соответствующих полномочий");
  }

  static wrongOperation() {
    this.id,
      (this.statusCode = 409),
      (this.title = "Conflict Error."),
      (this.detail =
        "Код состояния ответа HTTP 409 Conflict Error указывает, на конфликт");
  }
  static NotFound() {
    this.id,
      (this.statusCode = 404),
      (this.title = "Not Found Error."),
      (this.detail =
        "Код состояния ответа HTTP 404 Not Found Error указывает, на отсутствие компонента");
  }
}

module.exports = ApiError;
