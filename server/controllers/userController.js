const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models') 

class UserController{

  
        async registration(req, res, next) {
            const {email, password, role} = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }
        const candidate = await User.findOne({where: {email}})
         if (candidate){
            return next(ApiError.badRequest('User with this email address already exists'))
         }
         // ЕСЛИ НИЧЕГО НЕ НАШЛИ  ТО ХЕШИМ И СОЗДАЕМ USER 

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, role, password: hashPassword})
            //create only user 
            const basket = await Basket.create({userId: user.id})

            // генерирую json token 
            const token = jwt.sign(
                {id: user.id, email, role}, 
                process.env.SECRET_KEY, 
                // ЖИЗНЬ ТОКЕНА   
                {expiresIn: '24h'}
             )

             return res.json({token})

    }
    async login(req, res){
    }
     
    async check(req, res, next){
        const {id}= req.query
     
        if (!id) {
            return next(ApiError.badRequest('НЕ ЗАДАН ID'))
        }
        res.json(id)
    }


}
module.exports = new UserController()