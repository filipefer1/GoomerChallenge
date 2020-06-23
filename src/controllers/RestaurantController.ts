import { Request, Response, response } from "express";

import RestaurantModel from "../models/restaurant";
import {RequestParams} from "../interfaces/global";

export interface RequestBody {
  name: string;
  picture: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
    state: string;
  };
  week: [
    {
      day: string,
      open: boolean,
      openingTime: string,
      closingTime: string
    },
    {
      day: string,
      open: boolean,
      openingTime: string,
      closingTime: string
    },
    {
      day: string,
      open: boolean,
      openingTime: string,
      closingTime: string
    },
    {
      day: string,
      open: boolean,
      openingTime: string,
      closingTime: string
    },
    {
      day: string,
      open: boolean,
      openingTime: string,
      closingTime: string
    },
    {
      day: string,
      open: boolean,
      openingTime: string,
      closingTime: string
    },
    {
      day: string,
      open: boolean,
      openingTime: string,
      closingTime: string
    },
  ],
}


class Restaurant {
  async index(req: Request, res: Response) {
    const allRestaurants = await RestaurantModel.find();
    return res.status(200).json(allRestaurants);
  }

  async create(req: Request, res: Response) {
    const { name, picture, address, week } = req.body as RequestBody;
    const restaurant = new RestaurantModel({
      name,
      picture,
      address,
      week,
    });

    const newRestaurant = await restaurant.save();
    return res.status(201).json(newRestaurant);
  }

  async show(req: Request, res: Response) {
    const { restaurantId } = req.params as RequestParams;

    const restaurant = await RestaurantModel.findById(restaurantId);

    return res.status(200).json(restaurant);
  }

  async update(req: Request, res: Response){
    const {name, picture, address, week } = req.body as RequestBody;
    const {restaurantId} = req.params as RequestParams;

    const restaurant = await RestaurantModel.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({message: "Restaurant not found!"})
    }

    // ARRUMAR A ALTERAÇÃO NA WEEK
    console.log(...restaurant?.week, ...week)
    restaurant.name = name ? name : restaurant?.name!;
    restaurant.picture = picture ? picture : restaurant?.picture!;
    restaurant.address = address ? address : restaurant?.address!;
    restaurant.week = week ? week : restaurant?.week!;

    const updatedRestaurant = await restaurant.save();
    return res.status(200).json(updatedRestaurant)
  };

  async destroy(req: Request, res: Response) {
    const { restaurantId } = req.params as RequestParams;
    await RestaurantModel.findByIdAndDelete(restaurantId);

    return res.status(200).json({message: "Restaurant deleted"});
  }
}

export default Restaurant;
