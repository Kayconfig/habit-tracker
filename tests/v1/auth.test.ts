import request from 'supertest';
import app from '../../src/app.ts';
import { cleanUpDatabase } from '../setup/dbHelpers.ts';

describe('Authentication Endpoints', () => {
  afterEach(async () => {
    await cleanUpDatabase();
  });
  const registerEndpoint = '/api/v1/auth/register';
  const loginEndpoint = '/api/v1/auth/login';
  const newUser = {
    email: 'testemail@test.com',
    password: 'admin1234',
    username: 'testuser',
  };

  describe(`POST ${registerEndpoint}`, () => {
    it('should register a new user with valid data', async () => {
      const response = await request(app)
        .post(`${registerEndpoint}`)
        .send(newUser);

      expect(response.statusCode).toBe(201);
      expect(response.body.statusCode).toBe(201);
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('accessToken');
      expect(response.body.data.user).not.toHaveProperty('password');
    });

    it('should return 400 when email is not provided', async () => {
      const newUser = {
        password: 'admin1234',
        username: 'testuser',
      };
      const response = await request(app)
        .post(`${registerEndpoint}`)
        .send(newUser);

      expect(response.statusCode).toBe(400);
      expect(response.body.statusCode).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(Array.isArray(response.body.errors)).toBe(true);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });

    it('should return 400 when password is not provided', async () => {
      const newUser = {
        email: 'testuser@mail.com',
        username: 'testuser',
      };
      const response = await request(app)
        .post(`${registerEndpoint}`)
        .send(newUser);

      expect(response.statusCode).toBe(400);
      expect(response.body.statusCode).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(Array.isArray(response.body.errors)).toBe(true);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });

    it('should return 400 when username is not provided', async () => {
      const newUser = {
        email: 'testuser@mail.com',
        password: 'password238923',
      };
      const response = await request(app)
        .post(`${registerEndpoint}`)
        .send(newUser);

      expect(response.statusCode).toBe(400);
      expect(response.body.statusCode).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(Array.isArray(response.body.errors)).toBe(true);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });
  });

  describe(`POST ${loginEndpoint}`, () => {
    beforeAll(async () => {
      const response = await request(app).post(registerEndpoint).send(newUser);
      expect(response.statusCode).toBe(201);
    });
    it('should log in with valid credentials', async () => {
      const response = await request(app).post(loginEndpoint).send({
        email: newUser.email,
        password: newUser.password,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.statusCode).toBe(200);
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.user.password).toBeUndefined();
      expect(response.body.data.accessToken).toBeDefined();
    });

    it('should return 400 when email is missing', async () => {
      const response = await request(app)
        .post(`${loginEndpoint}`)
        .send({ password: newUser.password });

      expect(response.statusCode).toBe(400);
      expect(response.body.statusCode).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(Array.isArray(response.body.errors)).toBe(true);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });

    it('should return 400 when password is missing', async () => {
      const response = await request(app)
        .post(`${loginEndpoint}`)
        .send({ email: newUser.email });

      expect(response.statusCode).toBe(400);
      expect(response.body.statusCode).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(Array.isArray(response.body.errors)).toBe(true);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });

    it('should return 401 for invalid password', async () => {
      const response = await request(app)
        .post(`${loginEndpoint}`)
        .send({ email: newUser.email, password: 'fakePassword346734' });

      expect(response.statusCode).toBe(401);
      expect(response.body.statusCode).toBe(401);
    });

    it('should return 401 for invalid email', async () => {
      const response = await request(app)
        .post(`${loginEndpoint}`)
        .send({ password: newUser.password, email: 'fakeemail@mail.com' });

      expect(response.statusCode).toBe(401);
      expect(response.body.statusCode).toBe(401);
    });
  });
});
