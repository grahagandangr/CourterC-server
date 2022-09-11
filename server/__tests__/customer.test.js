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
    it.skip('should be return success message', async() => {
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

describe('POST /customer/register - missing email', () => {
    it('should be return an object with error message', async() => {
        const body = {
            username: "test3",
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

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })
})

describe('POST /customer/register - missing password', () => {
    it('should be return an object with error message', async() => {
        const body = {
            username: "test3",
            email: "test3@gmail.com",
            role: 'customer',
            phoneNumber: "0986556",
            address: "jl. earth",
            balance: 90000,
            location: [-6.287204, 106.839076]
        }

        const response = await request(app)
        .post('/customer/register')
        .send(body)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })
})

describe('POST /customer/register - invalid email', () => {
    it('should be return an object with error message', async() => {
        const body = {
            username: "test3",
            email: "test3gmail.com",
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

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })
})

describe('POST /customer/register - invalid password', () => {
    it('should be return an object with error message', async() => {
        const body = {
            username: "test3",
            email: "test3@gmail.com",
            password: "",
            role: 'customer',
            phoneNumber: "0986556",
            address: "jl. earth",
            balance: 90000,
            location: [-6.287204, 106.839076]
        }

        const response = await request(app)
        .post('/customer/register')
        .send(body)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })
})

describe('POST /customer/register - email already exist', () => {
    it('should be return an object with error message', async() => {
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

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })
})

describe('POST /customer/register - invalid email format', () => {
    it('should be return an object with error message', async() => {
        const body = {
            username: "test3",
            email: "test3",
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

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', expect.any(String))
    })
})

// describe('POST /customer/login - ok', () => {
//     it('should be return an object with success message', async() => {
//         const body = {
//             email: "abhi2@mail.com",
//             password: "12345",
//         }

//         const response = await request(app)
//         .post('/customer/login')
//         .send(body)
//         // console.log(body, '<<<<<<<<<<<<=========')
//         this.current_user_token = response.body.access_token

//         expect(response.status).toBe(200)
//         expect(response.body).toBeInstanceOf(Object)
//         expect(response.body).toHaveProperty('access_token', expect.any(String))
//         expect(response.body).toHaveProperty('name', expect.any(String))
//         expect(response.body).toHaveProperty('role', expect.any(String))
//         expect(response.body).toHaveProperty('email', expect.any(String))
//     })
// })

// describe('POST /customer/login - invalid password', () => {
//     it('should be return an object with error message', async() => {
//         const body = {
//             email: "abhi2@gmail.com",
//             password: "test1233",
//         }

//         const response = await request(app)
//         .post('/customer/login')
//         .send(body)

//         expect(response.status).toBe(400)
//         expect(response.body).toBeInstanceOf(Object)
//         expect(response.body).toHaveProperty('message', expect.any(String))
//     })
// })

// describe('POST /customer/login - invalid email', () => {
//     it('should be return an object with error message', async() => {
//         const body = {
//             email: "abhi123@email.com",
//             password: "12345",
//         }
//         const response = await request(app)
//         .post('/customer/login')
//         .send(body)

//         expect(response.status).toBe(400)
//         expect(response.body).toBeInstanceOf(Object)
//         expect(response.body).toHaveProperty('message', expect.any(String))
//     })
// })
