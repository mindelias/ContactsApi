import request from 'supertest';

import app from '../src/app';

describe('Contact Spec', () => {
  test('responds with json', function (done) {
    request(app)
      .get('/api/contacts')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
 test("non exitent contact error", async() => {
   const response = await request(app).get('/api/contact/non-existent');
   expect(response.status).toBe(400);
 });
  test("Quering a contact", async () => {
    const response = await request(app).get("/api/contact/non-existent");
    expect(response.status).toBe(400);
  });

});
