const upload = require("../download_setting/multer");
const { Device, DeviceInfo } = require("../models/models");
const ApiErorr = require("../error/ApiError");
const { s3Uploadv3 } = require("../download_setting/s3Service");
const Sequelize = require("sequelize");

class DeviceController {
  async create(req, res, next) {
    try {
      var { name, price, brandId, typeId, info } = req.body;

      const { img } = req.files;

      //let fileName = crypto.randomUUID() + img.name;

      if (
        img.mimetype === "image/png" ||
        img.mimetype === "image/jpg" ||
        img.mimetype === "image/jpeg"
      ) {
        var result = await s3Uploadv3(img);
        console.log(result);
      } else {
        new Error("incorrect type");
      }

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: result.Location,
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
    let { brandId, typeId, lastId, limit } = req.query;
    const Op = Sequelize.Op;
    limit = limit || 9; // максимум устройств
    let devices;
    const cursor = lastId || 0;

    if (
      (!brandId && !typeId) ||
      (brandId && !typeId) ||
      (!brandId && typeId) ||
      (brandId && typeId)
    ) {
      devices = await Device.findAndCountAll({
        limit,
        where: {
          id: {
            [Op.gt]: cursor,
          },
        },
      });
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
