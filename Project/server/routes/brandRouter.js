const Router = require("express");
// получаем роут из експрес
const router = new Router();
const brandController = require("../controllers/brandController");

router.post("/", brandController.create);
router.get("/", brandController.getAll);

module.exports = router;
