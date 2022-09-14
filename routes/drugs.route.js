const { Router } = require('express')
const router = Router()
const { drugController } = require('../controllers/drugs.controller')

router.post('/admin', drugController.addDrug)
router.delete('/admin/:id', drugController.deleteDrug)
router.patch('/admin/:id', drugController.updateDrug)
router.get('/admin', drugController.getDrugs)
router.get('/user', drugController.getDrugs)
router.get('/user/category/:id', drugController.getDrugsByCategoryId)
router.get('/user/:id', drugController.getDrugById)

module.exports = router