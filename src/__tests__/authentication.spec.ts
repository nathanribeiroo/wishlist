import request from 'supertest'
import app from '../configs/server';

let token = "";

describe("Authentication", () => {
    
    it("should authenticate with valid credentials", async () => {
        const response = await request(app)
            .post("/login")
            .send({
                email: "example@example.com",
                password: "1234"
            });
        
        return expect(response.status).toBe(200);
    });

    it("should not authenticate with invalid credentials", async () => {
        const response = await request(app)
            .post("/login")
            .send({
                email: "example@example.com",
                password: "123456"
            });
        
        return expect(response.status).toBe(404);
    });

    it("should not authenticate with user invalid", async () => {
        const response = await request(app)
            .post("/login")
            .send({
                email: "xxxx@example.com",
                password: "123456"
            });
        
        return expect(response.status).toBe(404);
    });

    it("should not authenticate with data body wrong", async () => {
        const response = await request(app)
            .post("/login")
            .send({
                emai: "example@example.com",
                password: "123456"
            });
        
        return expect(response.status).toBe(400);
    });

    it("should return token when authenticated", async () => {
        const response = await request(app)
            .post("/login")
            .send({
                email: "example@example.com",
                password: "1234"
            });

        token = response.body.token;
        
        return expect(response.body).toHaveProperty('token');
    });

    it("should access private routes when authenticated", async () => {
        const response = await request(app)
            .get("/customers")
            .set('Authorization', `Bearer ${token}`);

        return expect(response.status).toBe(200);
    });

    it("should not access private routes when wrong authenticated", async () => {
        const response = await request(app)
            .get("/customers")
            .set('Authorization', `Bearer KhGtffrEEws4Dd5F76tF7Ff7fo009jh98`);

        return expect(response.status).toBe(401);
    });

    it("should not access private routes when don't have authenticated", async () => {
        const response = await request(app)
            .get("/customers")

        return expect(response.status).toBe(401);
    });


})