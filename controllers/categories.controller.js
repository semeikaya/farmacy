const Category = require('../models/Category.model')

module.exports.categoryController = {
    addCategory: async (req, res) => {
        const { name, } = req.body
        try {
            await Category.create({
                name,
            })
            res.json('Категория добавлена')
        } catch (error) {
            res.json(error.message)
        }
    },

    deleteCategory: async (req, res) => {
        try {
            await Category.findByIdAndRemove(req.params.id)
            res.json('Категория удалена')
        } catch (error) {
            res.json(error.message)
        }
    },

    getCategories: async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (error) {
            res.json(error.message)
        }
    },

    updateCategory: async (req, res) => {
        try {
            await Category.findByIdAndUpdate(req.params.id, {
                name: req.body.name
            })
            res.json('Изменения сохранены')
        } catch (error) {
            res.json(error.message)
        }
    },
    
    getCategoryById: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id)
            res.json(category)
        } catch (error) {
            res.json(error.message)
        }
    },
}
