const { Court, User } = require('../models')

module.exports = class CourtController {

    static async getAll (req, res, next){

        try {

            const court = await Court.findAll()

            res.status(200).json({
                message: 'success get data court',
                court
            })
            
        } catch (error) {

            console.log(error)
            
        }
    }

    static async createCourt (req, res, next){

        const { name, description, UserId, openHour, closeHour, location } = req.body

        const lat = location[0]

        const long = location[1]

        const point =  { type: 'POINT', coordinates: [lat, long]}

        try {

            const court = await Court.create({ name, description, UserId, openHour, closeHour, location: point})

            res.status(201).json({
                message: 'success create data court',
                court
            })

            
        } catch (error) {

            console.log(error)
            
        }
        
    }

    static async updateCourt (req, res, next){

        const { name, description, UserId, openHour, closeHour, location } = req.body

        const { id } = req.params

        const lat = location[0]

        const long = location[1]

        const point = {type: 'POINT', coordinates: [lat, long]}

        try {

            const findCourt = await Court.findByPk(id)

            if(!findCourt) throw {name: 'Not Found'}

            const court = await Court.update({ name, description, UserId, openHour, closeHour, location: point }, {where: {

                id: findCourt.id

            }})

            res.status(200).json({
                message: 'success update court',
                court
            })
            
        } catch (error) {

            console.log(error)
            
        }
        
    }

    static async getDetail (req, res, next){

        const { id } = req.params

        try {

            const court = await Court.findByPk(id)
            
            res.status(200).json({
                message : 'success get detail',
                court
            })

        } catch (error) {

            console.log(error)
            
        }
        
    }

    static async deleteCourt (req, res, next){

        const { id } = req.params

        try {

            const findCourt = await Court.findByPk(id)

            if(!findCourt) throw {name: 'Not Found'}

            await Court.destroy({
                where: {
                    id: findCourt.id
                }
            })

            res.status(200).json({
                message: 'success delete court'
            })
            
        } catch (error) {

            console.log(error)
            
        }
        
    }
}

