import supertest from "supertest";
import { connect, connection } from "mongoose";
import app from "../../src/app";

import Restaurant from "../../src/models/restaurant";

import { RequestBody } from "../../src/controllers/RestaurantController";
import { dummy, dummyRestaurantInvalid } from "../data/dummy";

type RequestBodyGet = RequestBody[];
type RequestBodyError = {
  message: string
}
type RequestStatus = number;
interface UpdatedRequestBody extends RequestBody {
  _id: string;
}

describe("Test /restaurant routes", () => {
  let id: string;
  beforeAll(async () => {
    await connect("mongodb://localhost/goomerTest", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it("should create a restaurant on the database.", async () => {
    const response = await supertest(app).post("/restaurant").send(dummy);
    const restaurant = await Restaurant.findOne({ name: dummy.name });

    id = restaurant?._id;
    expect(response.status).toEqual(201);
    expect(restaurant?.name).toBeTruthy();
  });

  it("should not create a restaurant because the week object is missing fields", async () => {
    const response = await supertest(app)
      .post("/restaurant")
      .send(dummyRestaurantInvalid);

    const body = response.body as RequestBodyError;
    const status = response.status as RequestStatus;

    expect(status).toEqual(400);
    expect(body.message).toMatch(/Missing fields/)
  });

  it("should return a list of all restaurants", async () => {
    const response = await supertest(app).get("/restaurant");
    const body = response.body as RequestBodyGet;
    const status = response.status as RequestStatus;

    expect(status).toEqual(200);
  });

  it("should return just a restaurant", async () => {
    const response = await supertest(app).get(`/restaurant/${id}`);
    const status = response.status as RequestStatus;
    const restaurant = JSON.parse(response.text) as RequestBody;

    restaurant.week.forEach((day) => {
      if (!day.open) {
        expect(day).not.toHaveProperty(["openingTime"]);
        expect(day).not.toHaveProperty(["closingTime"]);
      }
    });
    expect(restaurant).toHaveProperty("name");
    expect(status).toEqual(200);
  });

  it("should update a restaurant", async () => {
    const response = await supertest(app)
      .put(`/restaurant/${id}`)
      .send({
        name: "Restaurant2",
        week: [
          {
            day: "monday",
            open: true,
            openingTime: "09:00",
            closingTime: "22:15",
          },
        ],
      });
    const body = response.body as UpdatedRequestBody;
    const status = response.status as RequestStatus;
    expect(status).toEqual(200);
    expect(body).toBeDefined();
    expect(body.week).not.toBeUndefined();
  });

  it("should delete a restaurant", async () => {
    const response = await supertest(app).delete(`/restaurant/${id}`);
    const status = response.status as RequestStatus;

    expect(status).toEqual(200);
  });

  afterAll(async () => {
    await connection.close();
  });
});
