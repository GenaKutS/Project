const Router = require('express')
// получаем роут из експрес
const router = new Router()

router.post('/')
router.get('/')
router.get('/:id')

module.exports = router
