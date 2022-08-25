const crypto = require("crypto");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiErorr = require("../error/ApiError");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = crypto.randomUUID() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            desctiption: i.desctiption,
            deviceId: device.id,
          })
        );
      }

      return res.json(device);
    } catch (e) {
      next(ApiErorr.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId } = req.query;
    let devices;
    if (
      (!brandId && !typeId) ||
      (brandId && !typeId) ||
      (!brandId && typeId) ||
      (brandId && typeId)
    ) {
      devices = await Device.findAndCountAll();
    }
    return res.json(devices);
  }

  getOne(req, res, next) {
    try {
      const { id } = req.params;
      Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: "info" }],
      }).then((device) => {
        if (!device) {
          return next(ApiError.badRequest("id is not configured correctly"));
        }
        return res.json(device);
      });
    } catch (e) {
      next(ApiErorr.badRequest(e.message));
    }
  }
}
module.exports = new DeviceController();
