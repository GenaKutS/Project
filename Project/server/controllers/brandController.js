const { Brand } = require("../models/models");
const ApiErorr = require("../error/ApiError");

class BrandController {
  async create(req, res, next) {
    try {
      let { name } = req.body;
      const brand = await Brand.create({ name });
      if (!name.length) {
        return next(ApiError.badRequest("Некоректне ім'я"));
      }
      return res.json(type);
    } catch (e) {
      next(ApiErorr.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
}
module.exports = new BrandController();
