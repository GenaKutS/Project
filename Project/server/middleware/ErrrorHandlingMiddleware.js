const ApiError = require("../error/ApiError");
const crypto = require("crypto");

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ id, title: err.message, detail });
  }
  return res.status(500).json({
    id: crypto.randomUUID,
    title: " ВТФ Непредвиденная ошибка! ",
    detail:
      " It means that the server encountered an unexpected condition that prevented it from fulfilling the request.",
  });
};
