import { connect, connection, Types } from "mongoose";
import supertest from "supertest";
import app from "../../src/app";

import { dummy, dummyProduct, dummyProductInvalid } from "../data/dummy";

import { RequestBody } from "../../src/controllers/ProductController";

type RequestBodyError = {
  message: string;
};

type RequestStatus = number;

const server = supertest(app);

describe("Product", () => {
  let restaurantId: string;
  let productId: string;
  beforeAll(async () => {
    await connect("mongodb://localhost/goomerTest", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const response = await server.post("/restaurant").send(dummy);
    restaurantId = response.body._id;
  });

  it("should create a valid product", async () => {
    const response = await server
      .post(`/product/${restaurantId}`)
      .send(dummyProduct);

    const status = response.status as RequestStatus;
    const body = response.body as RequestBody;

    productId = body._id;

    expect(status).toEqual(201);
    expect(body._id).toBeTruthy();
    body.promotion.days.forEach((promotionDay) => {
      expect(promotionDay).toHaveProperty("day");
      expect(promotionDay).toHaveProperty("isItInPromotion");
      if (promotionDay.isItInPromotion) {
        expect(promotionDay).toHaveProperty("startPromotion");
        expect(promotionDay).toHaveProperty("endPromotion");
      }
    });
  });

  it("should not create a product because a promotion was created on a day that the restaurant is closed", async () => {
    const response = await server
      .post(`/product/${restaurantId}`)
      .send(dummyProductInvalid);

    const status = response.status as RequestStatus;
    const body = response.body as RequestBodyError;

    expect(status).toEqual(400);
    expect(body.message).toMatch(/Could not create a promotion/);
  });

  it("should return an array of products", async () => {
    const response = await server.get(`/product/${restaurantId}`);
    const status = response.status as RequestStatus;
    const body = response.body as RequestBody[];

    expect(status).toEqual(200);
    expect(body.length).toBeGreaterThanOrEqual(1);
  });

  it("should update a product", async () => {
    const response = await server
      .put(`/product/${restaurantId}/${productId}`)
      .send({
        name: "DocesZé",
        category: "Doces",
        promotion: {
          promotionalPrice: 16.5,
          days: [
            {
              day: "monday",
              isItInPromotion: true,
              startPromotion: "19:15",
              endPromotion: "20:45",
            },
          ],
        },
      });

    const status = response.status as RequestStatus;
    const body = response.body as RequestBody;

    expect(status).toEqual(200);
    expect(body).toBeDefined();
    body.promotion.days.forEach((promotionDay) => {
      expect(promotionDay).toHaveProperty("day");
      expect(promotionDay).toHaveProperty("isItInPromotion");
      if (promotionDay.isItInPromotion) {
        expect(promotionDay).toHaveProperty("startPromotion");
        expect(promotionDay).toHaveProperty("endPromotion");
      }
    });
  });

  it("should not update the product because the restaurant id is incorrect", async () => {
    const response = await server
      .put(`/product/5ef3b8a6a825e228280ef896/${productId}`)
      .send({
        name: "DocesZé",
        category: "Doces",
        promotion: {
          promotionalPrice: 16.5,
          days: [
            {
              day: "monday",
              isItInPromotion: true,
              startPromotion: "19:15",
              endPromotion: "20:45",
            },
          ],
        },
      });

    const status = response.status as RequestStatus;
    const body = response.body as RequestBodyError;

    expect(status).toEqual(404);
    expect(body.message).toMatch(/Could not found/);
  });

  it("should not delete the product because the restaurant id is incorrect", async () => {
    const response = await server.delete(
      `/product/5ef3b8a6a825e228280ef896/${productId}`
    );
    const status = response.status as RequestStatus;
    const body = response.body as RequestBodyError;

    expect(status).toEqual(404);
    expect(body.message).toMatch(/Could not found/);
  });

  it("should delete a product from a restaurant", async () => {
    const response = await server.delete(
      `/product/${restaurantId}/${productId}`
    );
    const status = response.status as RequestStatus;

    expect(status).toEqual(200);
  });

  afterAll(async () => {
    await connection.close();
  });
});
