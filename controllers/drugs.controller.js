const Drug = require('../models/Drug.model.js')

module.exports.drugController = {
    addDrug: async (req, res) => {
        const { name, category, recipe, price, } = req.body
        try {
            await Drug.create({
                name,
                category,
                recipe,
                price,
            })
            res.json('Лекарство добавлена')
        } catch (error) {
            res.json(error.message)
        }
    },

    deleteDrug: async (req, res) => {
        try {
            await Drug.findByIdAndRemove(req.params.id)
            res.json('Лекарство удалено!')
        } catch (error) {
            res.json(error.message)
        }
    },

    updateDrug: async (req, res) => {
        const { name, category, recipe, price, } = req.body
        try {
            await Drug.findByIdAndUpdate(req.params.id, {
                name,
                category,
                recipe,
                price,
            })
            res.json('Изменения сохранены')
        } catch (error) {
            res.json(error.message)
        }
    },

    getDrugs: async (req, res) => {
        try {
            const drugs = await Drug.find().populate('category')
            res.json(drugs)
        } catch (error) {
            res.json(error.message)
        }
    },
    
    getDrugsByCategoryId: async (req, res) => {
        try {
            const drug = await Drug.find({ category: req.params.id })
            res.json(drug)
        } catch (error) {
            res.json(error.message)
        }
    },

    getDrugById: async (req, res) => {
        try {
            const drug = await Drug.findById(req.params.id)
            res.json(drug)
        } catch (error) {
            res.json(error.message)
        }
    },
}