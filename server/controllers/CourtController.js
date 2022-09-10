const { Court, User } = require('../models')

module.exports = class CourtController {

    static async getAll (req, res, next){

        try {

            const court  = await Court.findAll()


            res.status(200).json({
                message: 'success get court',
                court
            })
            
        } catch (error) {

            console.log(error)
            
        }
    }

    static async createCourt(req, res, next){

        // "name": "GOR Suluh",
        // "description": "GO GO Sport",
        // "UserId": 1,
        // "openHour": "09:00",
        // "closeHour": "23:00",
        // "address": "jl. earth",
        // "location": [-6.287204, 106.839076]

        const { name, description, openHour, closeHour, address, location } = req.body

        const UserId = req.user.id

        const [lat, long] = location

        const point = { type: 'POINT', coordinates: [lat, long]}

        try {

            const court = await Court.create({ name, description, UserId, openHour, closeHour, address, location: point })

            res.status(201).json({
                message: "success create court",
                court
            })

        } catch (error) {

            console.log(error)
            
        }

}
}

        

