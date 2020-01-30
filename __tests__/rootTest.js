const request = require('supertest');
const server = 'http://localhost:3000';

describe('testing request', () => {

    describe('/', () => {

        describe('GET', () => {
            it('send the index html file', () => {
                return request(server).get('/').expect(200).expect('Content-Type', /text\/html/)
            })
        })
    })

    describe('/user/register', () => {

        describe('POST', () => {
            it('expected response with status 200 and content type application/json', () => {
                return request(server).post('/user/register').expect(200).expect('Content-Type', /application\/json/)
            })
        })
    })

    describe('/api', () => {

        describe('POST', () => {
            it('expected response with status 200 and content type application/json', () => {
                return request(server).post('/api').expect(200).expect('Content-Type', /application\/json/)
            })
        })
    })

})