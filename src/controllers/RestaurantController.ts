import { Request, Response, NextFunction } from "express";

import RestaurantModel from "../models/restaurant";
import ProductModel from "../models/product";
import { RequestParams } from "../interfaces/global";

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
      day: string;
      open: boolean;
      openingTime?: string;
      closingTime?: string;
    },
    {
      day: string;
      open: boolean;
      openingTime?: string;
      closingTime?: string;
    },
    {
      day: string;
      open: boolean;
      openingTime?: string;
      closingTime?: string;
    },
    {
      day: string;
      open: boolean;
      openingTime?: string;
      closingTime?: string;
    },
    {
      day: string;
      open: boolean;
      openingTime?: string;
      closingTime?: string;
    },
    {
      day: string;
      open: boolean;
      openingTime?: string;
      closingTime?: string;
    },
    {
      day: string;
      open: boolean;
      openingTime?: string;
      closingTime?: string;
    }
  ];
}

class Restaurant {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const allRestaurants = await RestaurantModel.find();

      if (!allRestaurants) {
        const err = {
          status: 404,
          message: "Database could not found all restaurants",
        };
        next(err);
      }
      return res.status(200).json(allRestaurants);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { name, picture, address, week } = req.body as RequestBody;

    week.forEach((day, index) => {
      if (!day.open) {
        week[index] = { day: day.day, open: day.open };
      } else {
        if (!day.openingTime || !day.closingTime) {
          const err = {
            message: "Miss fields",
            status: 400,
          };
          return next(err);
        }
      }
    });

    const restaurant = new RestaurantModel({
      name,
      picture,
      address,
      week,
    });

    try {
      const newRestaurant = await restaurant.save();

      if (!newRestaurant) {
        const err = {
          status: 400,
          message: "Could not create a restaurant.",
        };
        next(err);
      }
      return res.status(201).json(newRestaurant);
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    const { restaurantId } = req.params as RequestParams;

    try {
      const restaurant = await RestaurantModel.findById(restaurantId);

      if (!restaurant) {
        const err = {
          message: "Could not found restaurant with the passed id",
          status: 404,
        };
        next(err);
      }
      return res.status(200).json(restaurant);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { name, picture, address, week } = req.body as RequestBody;
    const { restaurantId } = req.params as RequestParams;

    const restaurant = await RestaurantModel.findById(restaurantId);

    if (!restaurant) {
      const err = {
        message: "Restaurant not found!",
        status: 404,
      };
      return next(err);
    }

    week.forEach((updatedDay) => {
      if (!updatedDay.open) {
        updatedDay = { day: updatedDay.day, open: updatedDay.open };
      }
      restaurant.week.forEach((day, index) => {
        if (updatedDay.day === day.day) {
          if (
            updatedDay.open &&
            (!updatedDay.openingTime ||
            !updatedDay.closingTime)
          ) {
            const err = {
              message: "Miss fields",
              status: 400,
            };
            return next(err);
          }
          restaurant.week[index] = updatedDay;
        }
      });
    });

    restaurant.name = name ? name : restaurant.name;
    restaurant.picture = picture ? picture : restaurant.picture;
    restaurant.address = address
      ? { ...restaurant.address, ...address }
      : restaurant.address;

    try {
      const updatedRestaurant = await restaurant.save();

      if (!updatedRestaurant) {
        const err = {
          message: "restaurant has not been updated",
          status: 404,
        };
        return next(err);
      }
      return res.status(200).json(updatedRestaurant);
    } catch (err) {
      next(err);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    const { restaurantId } = req.params as RequestParams;
    try {
      await ProductModel.find({
        restaurantId: restaurantId,
      })
        .remove()
        .exec();

      const restaurantDeleted = await RestaurantModel.findByIdAndDelete(
        restaurantId
      );

      if (!restaurantDeleted) {
        const err = {
          message: "restaurant has not been deleted",
          status: 404,
        };
        next(err);
      }

      return res
        .status(200)
        .json({ message: "Restaurant deleted", restaurant: restaurantDeleted });
    } catch (err) {
      next(err);
    }
  }
}

export default Restaurant;
