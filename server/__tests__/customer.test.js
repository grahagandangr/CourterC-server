/*
    How To Run Test

    # First -> run env db test in your local

    1. npx sequelize --env test db:drop -> db:create
    2. npx sequelize --env test db:migrate
    
    # Second -> run the db test in your local

    1. npm test
*/

const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const { queryInterface } = sequelize

describe('POST /customer/register ', () => {
    it('should be return success message', async() => {
        const body = {
            username: "test3",
            email: "test3@gmail.com",
            password: "12345",
            role: 'customer',
            phoneNumber: "0986556",
            address: "jl. earth",
            balance: 90000,
            location: [-6.287204, 106.839076]
        }

        const response = await request(app)
        .post('/customer/register')
        .send(body)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })
})
