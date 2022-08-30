const { Type } = require("../models/models");
const ApiErorr = require("../error/ApiError");

class TypeController {
  async create(req, res, next) {
    try {
      let { name } = req.body;
      const type = await Type.create({ name });
      if (!name.length) {
        return next(ApiError.badRequest("Некоректне ім'я"));
      }
      return res.json(type);
    } catch (e) {
      next(ApiErorr.badRequest(err.message));
    }
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
}
module.exports = new TypeController();
