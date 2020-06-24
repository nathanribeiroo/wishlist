import request from 'supertest'
import app from '../configs/server';

describe("Routes", () => {
    it("should return error page not found", async () => {
        const response = await request(app)
            .get("/whatever");
        
        return expect(response.status).toBe(404);
    });
});