const Router = require("express");
const deviceController = require("../controllers/deviceController");
// получаем роут из експрес
const router = new Router();
const device = require("../controllers/deviceController");

router.post("/", deviceController.create);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);

module.exports = router;
