const { Router } = require('express')
const router = Router()
const { categoryController } = require('../controllers/categories.controller')

router.post('/admin', categoryController.addCategory)
router.delete('/admin/:id', categoryController.deleteCategory)
router.patch('/admin/:id', categoryController.updateCategory)
router.get('/admin', categoryController.getCategories)
router.get('/admin/:id', categoryController.getCategoryById)
router.get('/user', categoryController.getCategories)
router.get('/user/:id', categoryController.getCategoryById)

module.exports = router