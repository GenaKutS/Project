const Router = require('express')
// получаем роут из експрес
const router = new Router()
const typeController = require('../controllers/typeController')

router.post('/', typeController.create)
router.get('/', typeController.getAll)

module.exports = router
