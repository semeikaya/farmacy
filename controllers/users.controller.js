const User = require('../models/User.model.js')
const Drug = require('../models/Drug.model.js')

module.exports.userController = {
    addUser: async (req, res) => {
        const { name, money, recipe } = req.body
        try {
            await User.create({
                name,
                money,
                recipe
            })
            res.json('Юзер добавлен')
        } catch (error) {
            res.json(error.message)
        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndRemove(req.params.id)
            res.json('Юзер удален')
        } catch (error) {
            res.json(error.message)
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            res.json(error.message)
        }
    },

    addToBasket: async (req, res) => {
        const user = await User.findById(req.params.userid)
        const drug = await Drug.findById(req.params.drugid)
        try {
            if (drug.recipe === false) {
                if (user.recipe === true) {
                    await User.findByIdAndUpdate(req.params.userid, {
                        $push: { basket: req.params.drugid },
                        total: user.total + drug.price
                    }).populate('basket')
                    res.json('Товар добавлен в корзину')
                } else {
                    res.json('Вы не можете добавить это лекарство без рецепта')
                }
            }
            if (drug.recipe === true) {
                await User.findByIdAndUpdate(req.params.userid, {
                    $push: { basket: req.params.drugid },
                    total: user.total + drug.price
                }).populate('basket')
                res.json('Товар добавлен в корзину')
            }
        } catch (error) {
            res.json(error.message)
        }
    },

    buyDrug: async (req, res) => {
        const user = await User.findById(req.params.userid)
        try {
            if (user.money >= user.total) {
                await User.findByIdAndUpdate(req.params.userid, {
                    basket: [],
                    money: user.money - user.total,
                    total: 0
                })
                res.json('Спасибо за покупку!')
            }
            if (user.money < user.total) {
                res.json('Пожалуйста пополните ваш кошелек')
            }
        } catch (error) {
            res.json(error.message)
        }
    },

    addMoney: async (req, res) => {
        const user = await User.findById(req.params.userid)
        try {
            await User.findByIdAndUpdate(req.params.userid, {
                money: user.money + req.body.money
            })
            res.json(`Вы пополнили кошелек на ${req.body.money}`)
        } catch (error) {
            res.json(error.message)
        }
    },

    deleteDrug: async (req, res) => {
        const user = await User.findById(req.params.userid)
        const drug = await Drug.findById(req.params.drugid)
        try {
            if (user.basket.includes(req.params.drugid)) {
                let i = 0
                for (const ar of user.basket) {
                    if (ar.toString() === req.params.drugid) {
                        i++
                    }
                }
                await User.findByIdAndUpdate(req.params.userid, {
                    $pull: { basket: req.params.drugid },
                    total: user.total - drug.price * i
                }).populate('basket')
                res.json('Товар удален из корзины')
            }
        } catch (error) {
            res.json(error.message)
        }
    },
    
    cleanBasket: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.userid, {
                basket: [],
                total: 0
            })
            res.json('Корзина очищена')
        } catch (error) {
            res.json(error.message)
        }
    },
}