import supertest from "supertest";
import { connect, connection } from "mongoose";
import app from "../../src/app";

import Restaurant from "../../src/models/restaurant";

import { RequestBody } from "../../src/controllers/RestaurantController";

type RequestBodyGet = RequestBody[];
type RequestStatus = number;

const dummy = {
  name: "test2",
  picture: "imagePicture",
  address: {
    street: "Rua1",
    city: "Valparaíso",
    zipCode: "1234-789",
    state: "GO",
  },
  week: [
    {
      day: "monday",
      open: false,
    },
    {
      day: "tuesday",
      open: true,
      openingTime: "09",
      closingTime: "22",
    },
    {
      day: "wednesday",
      open: true,
      openingTime: "09",
      closingTime: "22",
    },
    {
      day: "thursday",
      open: true,
      openingTime: "09",
      closingTime: "22",
    },
    {
      day: "friday",
      open: true,
      openingTime: "09",
      closingTime: "22",
    },
    {
      day: "saturday",
      open: true,
      openingTime: "16",
      closingTime: "00",
    },
    {
      day: "sunday",
      open: true,
      openingTime: "09",
      closingTime: "23",
    },
  ],
};

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

  it("shoudld return a list of all restaurants", async () => {
    const response = await supertest(app).get("/restaurant");
    const body = response.body as RequestBodyGet;
    const status = response.status as RequestStatus;

    expect(status).toEqual(200);
  });

  it("should return just a restaurant", async () => {
    const response = await supertest(app).get(
      `/restaurant/${id}`
    );
    const status = response.status as RequestStatus;
    const restaurant = JSON.parse(response.text) as RequestBody;
    
    restaurant.week.forEach(day => {
      if (!day.open) {
        expect(day).not.toHaveProperty(["openingTime"])
        expect(day).not.toHaveProperty(["closingTime"])
      }
    })
    expect(restaurant).toHaveProperty("name");
    expect(status).toEqual(200);
  });

  it("should update a restaurant", async () => {
    const response = await supertest(app).put(
      `/restaurant/${id}`
    );
    const status = response.status as RequestStatus;
    expect(status).toEqual(200);
  })

  it("should delete a restaurant", async () => {
    const response = await supertest(app).delete(
      `/restaurant/5eecd857165970752dfd0ba4`
    );
    const status = response.status as RequestStatus;

    expect(status).toEqual(200);
  })

  afterAll(async () => {
    await connection.close();
  });
});
