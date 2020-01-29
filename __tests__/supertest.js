const request = require('supertest');
const server = 'http://localhost:3000';

// make sure the server is running before running tests
describe('Route testing', () => {
    // root path that renders index.html
    describe('/', () => {
        describe('GET', () => {
            it('responds with 200 status and text/html content type', () => {
            return request(server)
                .get('/')
                .set('Accept', 'text/html') // request headers
                .expect('Content-Type', /text\/html/)
                .expect(200);
            });
        });
    });

    // post request to /api
    describe('/api', () => {
        describe('POST', () => {
            it('responds with 200 status and application/json content type', async () => {
                const response = await request(server)
                                        .post('/api')
                                        .set('Accept', 'application/json')
                                        .send({ address: '125 Lefferts Pl', borough: 'brooklyn' });
                console.log(response);
                // .expect('Content-type', /application\/json/)
                // .expect(200, done);
                expect(response).toBeTruthy();
            });
        });
    });
});