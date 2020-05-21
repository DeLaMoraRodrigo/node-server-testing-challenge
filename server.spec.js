const supertest = require('supertest');

const server = require('./server');

const db = require('./data/dbConfig');

afterAll(async() => {
    await db('items').truncate();
})

describe('server', () => {
    it('should run tests', () => {
        expect(true).toBeTruthy()
    })

    describe('GET /', () => {
        it('should return http status code 200', () => {
            return (
                supertest(server)
                    .get('/')
                    .then(res => {
                        expect(res.status).toBe(200)
                    })
            )
        })

        it('should return { api: "Up" }', () => {
            return (
                supertest(server)
                    .get('/')
                    .then(res => {
                        expect(res.body).toEqual({ api: "Up" })
                    })
            )
        })
    })

    describe('GET /api/items', () => {
        it('should return http status code 200', () => {
            return (
                supertest(server)
                    .get('/api/items')
                    .then(res => {
                        expect(res.status).toBe(200)
                    })
            )
        })

        it('should return an array', () => {
            return (
                supertest(server)
                    .get('/api/items')
                    .then(res => {
                        expect(Array.isArray(res.body.data)).toBe(true)
                    })
            )
        })
    })


    describe('POST /api/items', () => {
        it('should return http status code 400 with nothing in the body', () => {
            return (
                supertest(server)
                    .post('/api/items')
                    .then(res => {
                        expect(res.status).toBe(400)
                    })
            )
        })

        it('should return the object sent with an id of 1', () => {
            return (
                supertest(server)
                    .post('/api/items')
                    .send({ name: "Gold Sword", durability: 5, enhancement: 5 })
                    .then(res => {
                        expect(res.body.data).toEqual({ id: 1, name: "Gold Sword", durability: 5, enhancement: 5 })
                    })
            )
        })

        it('should return http status code 201 with a valid object', () => {
            return (
                supertest(server)
                    .post('/api/items')
                    .send({ name: "Gold Sword", durability: 5, enhancement: 5 })
                    .then(res => {
                        expect(res.status).toBe(201)
                    })
            )
        })
    })

    describe('GET /api/items/:id', () => {
        it('should return http status code 200', () => {
            return (
                supertest(server)
                    .get('/api/items/1')
                    .then(res => {
                        expect(res.status).toBe(200)
                    })
            )
        })

        it('should return http status code 404', () => {
            return (
                supertest(server)
                    .get('/api/items/50')
                    .then(res => {
                        expect(res.status).toBe(404)
                    })
            )
        })
    })

    describe('DELETE /api/items/:id', () => {
        it('should return http status code 204', () => {
            return (
                supertest(server)
                    .delete('/api/items/1')
                    .then(res => {
                        expect(res.status).toBe(204)
                    })
            )
        })

        it('should return http status code 404 with nothing in the database', () => {
            return (
                supertest(server)
                    .delete('/api/items/50')
                    .then(res => {
                        expect(res.status).toBe(404)
                    })
            )
        })
    })
})