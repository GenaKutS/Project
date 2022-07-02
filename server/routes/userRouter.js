const Router = require('express')
// получаем роут из експрес
const router = new Router()

router.post('/registration')
router.post('/login')
router.get('/auth', (req, res) => {
  res.json({ message: 'all work' })
})

module.exports = router
