const request = require('supertest');
const app = require('./server');

describe('Houseyog Clone API Tests', () => {
    test('GET / should serve the frontend', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Houseyog');
    });

    test('GET /api/packages should return packages', async () => {
        const response = await request(app).get('/api/packages');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/auth/register should create a new user', async () => {
        const userData = {
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890',
            password: 'password123'
        };

        const response = await request(app)
            .post('/api/auth/register')
            .send(userData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
    });

    test('POST /api/consultations should create a consultation', async () => {
        const consultationData = {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '9876543210',
            service: 'house_plan',
            message: 'I need help with my house design'
        };

        const response = await request(app)
            .post('/api/consultations')
            .send(consultationData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
    });
});

module.exports = app;

