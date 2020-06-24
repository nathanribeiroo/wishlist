import faker from 'faker';
import request from 'supertest';

import app from '../configs/server';

let token = "";
let customerId = "";

describe("Customers", () => {
    beforeAll(async () => {
        const response = await request(app)
            .post("/login")
            .send({
                email: "test@luizalabs.com",
                password: "12345"
            });

        token = response.body.token;
    });


    describe("Customers CREATE", () => {
        it("should create a customer", async () => {
            const response = await request(app)
                .post("/customers")
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: faker.name.findName(),
                    email: "test@test.com"
                });

            return expect(response.status).toBe(200);
        });

        it("should create other customer", async () => {
            const response = await request(app)
                .post("/customers")
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: faker.name.findName(),
                    email: faker.internet.email()
                });

            return expect(response.status).toBe(200);
        });

        it("should not create a customer with same email", async () => {
            const response = await request(app)
                .post("/customers")
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: faker.name.findName(),
                    email: "test@test.com"
                });

            return expect(response.status).toBe(400);
        });

        it("should not create customer without name", async () => {
            const response = await request(app)
                .post("/customers")
                .set('Authorization', `Bearer ${token}`)
                .send({
                    email: faker.internet.email()
                });

            return expect(response.status).toBe(400);
        });

        it("should not create customer without email", async () => {
            const response = await request(app)
                .post("/customers")
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: faker.name.findName()
                });

            return expect(response.status).toBe(400);
        });

        it("should not create customer with email invalid", async () => {
            const response = await request(app)
                .post("/customers")
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: faker.name.findName(),
                    email: "example@test.coom"
                });

            return expect(response.status).toBe(400);
        });
    });

    // list test
    describe("Customers LIST", () => {
        it("should list customers", async () => {
            const response = await request(app)
                .get(`/customers`)
                .set('Authorization', `Bearer ${token}`);

            if (response.body.length > 0)
                customerId = response.body[0].id;

            return expect(response.status).toBe(200);
        });

        it("should list customers details", async () => {
            const response = await request(app)
                .get(`/customers/${customerId}`)
                .set('Authorization', `Bearer ${token}`);

            return expect(response.status).toBe(200);
        });

        it("should not list customers details", async () => {
            const response = await request(app)
                .get(`/customers/94ae-4cte0-aaeb`)
                .set('Authorization', `Bearer ${token}`);

            return expect(response.status).toBe(400);
        });

        it("should not list customers details with id wrong", async () => {
            const response = await request(app)
                .get(`/customers/${faker.random.uuid()}`)
                .set('Authorization', `Bearer ${token}`);

            return expect(response.status).toBe(404);
        });
    });


    // update test
    describe("Customers UPDATE", () => {
        it("should update customer", async () => {
            const response = await request(app)
                .put(`/customers/${customerId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: faker.name.findName(),
                    email: "update@test.com"
                });

            return expect(response.status).toBe(200);
        });

        it("should not update with id customer invalid", async () => {
            const response = await request(app)
                .put(`/customers/94ae-4cte0-aaeb`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: faker.name.findName(),
                    email: "update1@test.com"
                });

            return expect(response.status).toBe(400);
        });

        it("should not update with customer not found", async () => {
            const response = await request(app)
                .put(`/customers/${faker.random.uuid()}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: faker.name.findName(),
                    email: "update2@test.com"
                });

            return expect(response.status).toBe(404);
        });

        it("should not update without data body", async () => {
            const response = await request(app)
                .put(`/customers/${customerId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({});

            return expect(response.status).toBe(400);
        });
    });

    // delete test
    describe("Customers DELETE", () => {
        it("should not delete customer with id invalid", async () => {
            const response = await request(app)
                .delete(`/customers/94ae-4cte0-aaeb`)
                .set('Authorization', `Bearer ${token}`);

            return expect(response.status).toBe(400);
        });

        it("should not delete customer with customer not found", async () => {
            const response = await request(app)
                .delete(`/customers/${faker.random.uuid()}`)
                .set('Authorization', `Bearer ${token}`);

            return expect(response.status).toBe(404);
        });

        it("should delete customer", async () => {
            const response = await request(app)
                .delete(`/customers/${customerId}`)
                .set('Authorization', `Bearer ${token}`);

            return expect(response.status).toBe(204);
        });
    });

});