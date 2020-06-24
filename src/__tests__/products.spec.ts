import faker from 'faker';
import request from 'supertest';
import app from '../configs/server';



describe("Products", () => {
    let token = "";
    let customerId = "";
    let productId = "d700bac1-73e3-6c67-7bfe-3f9c7a7c8063";

    beforeAll(async () => {

        const login = await request(app)
            .post("/login")
            .send({
                email: "test@luizalabs.com",
                password: "12345"
            });

        
        token = login.body.token;

        const customers = await request(app)
            .post("/customers")
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: faker.name.firstName(),
                email: faker.internet.exampleEmail(),
            });

        customerId = customers.body.id;
    });

    // CREATE test
    describe("Products CREATE", () => {
        // sleep.msleep(100);
        it("should add a product for customer", async () => {
            const response = await request(app)
                .post(`/customers/${customerId}/products`)
                .set('Authorization', `Bearer ${token}`)
                .send({ productId });


            return expect(response.status).toBe(200);
        });

        it("should not add a product because product already exists for this customer", async () => {
            const response = await request(app)
                .post(`/customers/${customerId}/products`)
                .set('Authorization', `Bearer ${token}`)
                .send({ productId });

            return expect(response.status).toBe(400);
        });


        it("should not add a product for customer with id product not found", async () => {
            const response = await request(app)
                .post(`/customers/${customerId}/products`)
                .set('Authorization', `Bearer ${token}`)
                .send({ productId: faker.random.uuid() });

            return expect(response.status).toBe(500);
        });

        it("should not add a product for customer without productId exist in request", async () => {
            const response = await request(app)
                .post(`/customers/${customerId}/products`)
                .set('Authorization', `Bearer ${token}`)
                .send({});
            return expect(response.status).toBe(400);
        });

        it("should not add a product for customer with id customer invalid", async () => {
            const response = await request(app)
                .post(`/customers/4903n-ae33dd-32eds/products`)
                .set('Authorization', `Bearer ${token}`)
                .send({ productId });
            return expect(response.status).toBe(400);
        });

        it("should not add a product for customer with customer not found", async () => {
            const response = await request(app)
                .post(`/customers/${faker.random.uuid()}/products`)
                .set('Authorization', `Bearer ${token}`)
                .send({ productId });
            return expect(response.status).toBe(404);
        });

        it("should add a product for customer with data review", async () => {
            const response = await request(app)
                .post(`/customers/${customerId}/products`)
                .set('Authorization', `Bearer ${token}`)
                .send({ productId: "571fa8cc-2ee7-5ab4-b388-06d55fd8ab2f" });
            return expect(response.body).toHaveProperty('review');
        });
    });

    // LIST test
    describe("Products LIST", () => {
        // sleep.msleep(110);
        it("should list the products for customer", async () => {
            const response = await request(app)
                .get(`/customers/${customerId}/products`)
                .set('Authorization', `Bearer ${token}`);
            return expect(response.status).toBe(200);
        });

        it("should not list the product for customer with id customer invalid", async () => {
            const response = await request(app)
                .get(`/customers/ab23-17ecr-44aace/products`)
                .set('Authorization', `Bearer ${token}`);
            return expect(response.status).toBe(400);
        });

        it("should not list the product for customer with customer not found", async () => {
            const response = await request(app)
                .get(`/customers/${faker.random.uuid()}/products`)
                .set('Authorization', `Bearer ${token}`);
            return expect(response.status).toBe(404);
        });

        it("should list the details of a product for the customer", async () => {
            const response = await request(app)
                .get(`/customers/${customerId}/products/${productId}`)
                .set('Authorization', `Bearer ${token}`);
            return expect(response.status).toBe(200);
        });

        it("should not list the details of a product for the customer with customer not found", async () => {
            const response = await request(app)
                .get(`/customers/${faker.random.uuid()}/products/${productId}`)
                .set('Authorization', `Bearer ${token}`);
            return expect(response.status).toBe(404);
        });

        it("should not list the details of a product for the customer with id product invalid", async () => {
            const response = await request(app)
                .get(`/customers/${customerId}/products/383d-323c-31xsa-431`)
                .set('Authorization', `Bearer ${token}`);
            return expect(response.status).toBe(400);
        });

        it("should not list the details of a product for the customer with product not found", async () => {
            const response = await request(app)
                .get(`/customers/${customerId}/products/${faker.random.uuid()}`)
                .set('Authorization', `Bearer ${token}`);
            return expect(response.status).toBe(404);
        });
    });


    // DELETE 
    describe("Products DELETE", () => {
        // sleep.msleep(200);
        it("should not delete product for the customer with id customer invalid", async () => {
            const response = await request(app)
                .delete(`/customers/aa23-cse3-aasw2/products/${productId}`)
                .set('Authorization', `Bearer ${token}`);
            return expect(response.status).toBe(400);
        });

        it("should not delete product for the customer with customer not found", async () => {
            const response = await request(app)
                .delete(`/customers/${faker.random.uuid()}/products/${productId}`)
                .set('Authorization', `Bearer ${token}`);
            return expect(response.status).toBe(404);
        });

        it("should not delete product for the customer with id product invalid", async () => {
            const response = await request(app)
                .delete(`/customers/${customerId}/products/aa23-cse3-aasw2`)
                .set('Authorization', `Bearer ${token}`);
            return expect(response.status).toBe(400);
        });

        it("should not delete product for the customer with product not found", async () => {
            const response = await request(app)
                .delete(`/customers/${customerId}/products/${faker.random.uuid()}`)
                .set('Authorization', `Bearer ${token}`);
            return expect(response.status).toBe(404);
        });

        it("should delete product for the customer", async () => {
            const response = await request(app)
                .delete(`/customers/${customerId}/products/${productId}`)
                .set('Authorization', `Bearer ${token}`);
            return expect(response.status).toBe(204);
        });
    });


});