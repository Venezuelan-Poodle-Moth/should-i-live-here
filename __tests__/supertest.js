const request = require('supertest');
const server = 'http://localhost:3000';

// make sure the server is running before running tests
describe('Route testing', () => {
    // root path that renders index.html
    describe('/', () => {
        describe('GET', () => {
            it('responds with 200 status and text/html content type', (done) => {
            return request(server)
                .get('/')
                .set('Accept', 'text/html') // request headers
                .expect('Content-Type', /text\/html/)
                .expect(200, done);
            });
        });
    });

    // post request to /api
    describe('/api', () => {
        describe('POST', () => {
            const requestBody = { address: '125 Lefferts Pl', borough: 'brooklyn' };
            it('responds with 200 status and application/json content type', (done) => {
                return request(server)
                .post('/api')
                .set('Accept', 'application/json')
                .send(requestBody)
                .expect('Content-type', /application\/json/)
                .expect(200, done);
            });

            it('has a response body with the type of array', async() => {
                const response = await request(server).post('/api').send(requestBody);
                expect(Array.isArray(response.body)).toBeTruthy();
            });
        });
    });

    // requests to the /user
    describe('/user route', () => {
        describe('/user/login POST', () => {
            const correctInfo = { email: 'ben@gmail.com', password: 'ben' };
            it('responds with 200 status and application/json content type when email and password are correct', (done) => {
                return request(server)
                .post('/user/login')
                .set('Accept', 'application/json')
                .send(correctInfo)
                .expect('Content-type', /application\/json/)
                .expect(200, done);
            });

            const wrongEmail = { ...correctInfo, email: 'b@gmail.com' };
            it('responds with an empty object when the email is not registered', async() => {
                const response = await request(server).post('/user/login').send(wrongEmail);
                expect(response.body).toEqual({});
            });

            const wrongPassword = { ...correctInfo, password: 'password' };
            it('responds with 400 status when the password is incorrect', async() => {
                const response = await request(server).post('/user/login').send(wrongPassword);
                expect(response.status).toBe(400);
            });

        });
    });
});