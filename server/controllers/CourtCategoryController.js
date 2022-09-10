const { CourtCategory, Image, Court, Category } = require('../models')

module.exports = class CourtCategoryController {

    static async getAll (req, res, next){

        try {

            const courtCategory = await CourtCategory.findAll({
                include: [Court, Category]
            })

            res.status(200).json({
                courtCategory
            })
            
        } catch (error) {

            console.log(error)
            
        }
        
    }

    static async createCourtCategory (req, res, next){

        const { CourtId, CategoryId, price } = req.body

        try {

            const created = await CourtCategory.create({ CourtId, CategoryId, price})

            res.status(201).json({
                message: 'success create court category',
                created
            })
            
        } catch (error) {

            console.log(error)
            
        }
        
    }

    static async updateCourtCategory (req, res, next){

        const { id } = req.params

        const { CourtId, CategoryId, price } = req.body

        try {

            const courtCategory = await CourtCategory.update({CourtId, CategoryId, price}, 
                {
                    where: {
                        id
                    }
                })

            res.status(200).json({
                message: 'courtCategory updated',
                courtCategory
            })
            
        } catch (error) {
            
            console.log(error)
            
        }
        
    }

    static async getDetail (req, res, next){

        const { id } = req.params

        try {

            const courtCategory = await CourtCategory.findOne({
                where: { id },
                include: [
                    {
                        model: Court,

                    },
                    {
                        model: Category
                    }
                ]
            })

            res.status(200).json({
                courtCategory
            })
            
        } catch (error) {

            console.log(error)
            
        }
        
    }

    static async deleteCourtCategory (req, res, next){

        const { id } = req.params

        try {

            await CourtCategory.destroy({
                where: { id }
            })

            res.status(200).json({
                message: 'success delete courtCategory'
            })
            
        } catch (error) {

            console.log(error)
            
        }
        
    }

    static async getImage (req, res, next){

        try {

            const image = await Image.findAll({
                include: [CourtCategory]
            })

            res.status(200).json({
                image
            })
            
        } catch (error) {

            console.log(error)
            
        }

    }

    static async createImage (req, res, next){

        const { imgUrl, CourtCategoryId } = req.body

        try {

            const image = await Image.create({ imgUrl, CourtCategoryId })

            res.status(201).json({
                message: 'image created',
                image
            })
            
        } catch (error) {

            console.log(error)
            
        }

    }
    
}