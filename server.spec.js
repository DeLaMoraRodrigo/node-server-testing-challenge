const supertest = require('supertest');

const server = require('./server');

const db = require('./data/dbConfig');

beforeEach(() => {
    return db.migrate.rollback().then(()=>db.migrate.latest()).then(()=>db.seed.run());
});

describe('server', () => {
    it('should run tests', () => {
        expect(true).toBeTruthy()
    })

    describe('GET /', () => {
        it('should return http status code 200', async() => {
            const res = await supertest(server).get('/');
            
            expect(res.status).toBe(200)
        })

        it('should return { api: "Up" }', async() => {
            const res = await supertest(server).get('/');

            expect(res.body).toEqual({ api: "Up" })
        })
    })

    describe('GET /api/items', () => {
        it('should return http status code 200', async() => {
            const res = await supertest(server).get('/api/items');

            expect(res.status).toBe(200)
        })

        it('should return an array', async() => {
            const res = await supertest(server).get('/api/items');

            expect(Array.isArray(res.body.data)).toBe(true)
        })
    })


    describe('POST /api/items', () => {
        it('should return http status code 400 with nothing in the body', async() => {
            const res = await supertest(server).post('/api/items');

            expect(res.status).toBe(400)
        })

        it('should return the object sent with an id of 1', async() => {
            const res = await supertest(server).post('/api/items').send({ name: "Gold Sword", durability: 5, enhancement: 5 });

            expect(res.body.data).toEqual({ id: 4, name: "Gold Sword", durability: 5, enhancement: 5 })
        })

        it('should return http status code 201 with a valid object', async() => {
            const res = await supertest(server).post('/api/items').send({ name: "Gold Sword", durability: 5, enhancement: 5 });

            expect(res.status).toBe(201)
        })
    })

    describe('GET /api/items/:id', () => {
        it('should return http status code 200', async() => {
            const res = await supertest(server).get('/api/items/1');

            expect(res.status).toBe(200)
        })

        it('should return http status code 404', async() => {
            const res = await supertest(server).get('/api/items/50');

            expect(res.status).toBe(404)
        })
    })

    describe('DELETE /api/items/:id', () => {
        it('should return http status code 204', async() => {
            const res = await supertest(server).delete('/api/items/1');

            expect(res.status).toBe(204)
        })

        it('should return http status code 404 with nothing in the database', async() => {
            const res = await supertest(server).delete('/api/items/50');

            expect(res.status).toBe(404)
        })
    })
})