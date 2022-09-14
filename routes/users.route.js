const { Router } = require('express')
const router = Router()
const { userController } = require('../controllers/users.controller')

router.post('/admin', userController.addUser)
router.delete('/admin/:id', userController.deleteUser)
router.get('/admin', userController.getUsers)
router.patch('/basket/:userid/:drugid', userController.addToBasket)
router.patch('/basket/:userid', userController.buyDrug)
router.patch('/money/:userid', userController.addMoney)
router.patch('/removebasket/:userid/:drugid', userController.deleteDrug)
router.patch('/cleanbasket/:userid', userController.cleanBasket)

module.exports = router