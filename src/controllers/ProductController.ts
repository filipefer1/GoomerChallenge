import { Request, Response, NextFunction } from "express";

import ProductModel from "../models/product";
import RestaurantModel from "../models/restaurant";
import { RequestParams } from "../interfaces/global";

export interface RequestBody {
  _id: string;
  name: string;
  picture: string;
  price: number;
  category: string;
  promotion: {
    description: string;
    promotionPrice: number;
    days: [
      {
        day: string;
        isItInPromotion?: boolean;
        startPromotion?: string;
        endPromotion?: string;
      },
      {
        day: string;
        isItInPromotion?: boolean;
        startPromotion?: string;
        endPromotion?: string;
      },
      {
        day: string;
        isItInPromotion?: boolean;
        startPromotion?: string;
        endPromotion?: string;
      },
      {
        day: string;
        isItInPromotion?: boolean;
        startPromotion?: string;
        endPromotion?: string;
      },
      {
        day: string;
        isItInPromotion?: boolean;
        startPromotion?: string;
        endPromotion?: string;
      },
      {
        day: string;
        isItInPromotion?: boolean;
        startPromotion?: string;
        endPromotion?: string;
      },
      {
        day: string;
        isItInPromotion?: boolean;
        startPromotion?: string;
        endPromotion?: string;
      }
    ];
  };
}

class Product {
  async create(req: Request, res: Response, next: NextFunction) {
    const {
      name,
      picture,
      price,
      category,
      promotion,
    } = req.body as RequestBody;
    const { restaurantId } = req.params as RequestParams;

    try {
      let err: boolean = false;
      const restaurantWeek = await RestaurantModel.findById(
        restaurantId
      ).select("week");

      restaurantWeek?.week.forEach((weekDay) => {
        promotion.days.forEach((promotionDay) => {
          if (
            weekDay.day === promotionDay.day &&
            !weekDay.open &&
            promotionDay.isItInPromotion
          ) {
            err = true;
          }
        });
      });

      if (err) {
        return res
          .status(400)
          .json({
            message: `Could not create a promotion, check if the restaurant is open on the day of the promotion`,
          });
      }
      
      promotion.days.forEach((promotionDay, index) => {
        if (!promotionDay.isItInPromotion) {
          promotion.days[index] = {
            day: promotionDay.day,
            isItInPromotion: promotionDay.isItInPromotion,
          };
        }
      });

      const product = new ProductModel({
        name,
        picture,
        price,
        category,
        promotion,
        restaurantId,
      });

      const newProduct = await product.save();

      // if (!newProduct) {
      //   const err = {
      //     message: "Could not create a product",
      //     status: 400,
      //   };
      //   return next(err);
      // }
      return res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    const { restaurantId } = req.params as RequestParams;

    try {
      const products = await ProductModel.find({
        restaurantId: restaurantId,
      }).populate("restaurantId", "name");

      if (!products) {
        const err = {
          message: "Could not found all products",
          status: 404,
        };
        return next(err);
      }

      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { restaurantId, productId } = req.params as RequestParams;
    const {
      name,
      picture,
      price,
      category,
      promotion,
    } = req.body as RequestBody;

    try {
      const product = await ProductModel.findById(productId);

      if (!product) {
        const err = {
          message: "Could not found the product with the passed id",
          status: 404,
        };
        return next(err);
      }

      if (product.restaurantId.toString() !== restaurantId) {
        const err = {
          message: "Could not found the product with the passed id",
          status: 404,
        };
        return next(err);
      }

      promotion.days.forEach((updatedDay) => {
        if (updatedDay.isItInPromotion) {
          if (!updatedDay.startPromotion || !updatedDay.endPromotion) {
            const err = {
              message: "Miss fields",
              state: 400,
            };
            return next(err);
          }

          updatedDay = {
            day: updatedDay.day,
            isItInPromotion: updatedDay.isItInPromotion,
            startPromotion: updatedDay.startPromotion,
            endPromotion: updatedDay.endPromotion,
          };
        } else {
          updatedDay = {
            day: updatedDay.day,
          };
        }

        product.promotion.days.forEach((promotionDay, index) => {
          if (updatedDay.day === promotionDay.day) {
            const updatedPromotion = Object.assign(
              product.promotion.days[index],
              updatedDay
            );
            product.promotion.days[index] = updatedPromotion;
          }
        });
      });

      product.name = name ? name : product.name;
      product.picture = picture ? picture : product.picture;
      product.price = price ? price : product.price;
      product.category = category ? category : product.category;
      product.promotion.description = promotion.description
        ? promotion.description
        : product.promotion.description;
      product.promotion.promotionPrice = promotion.promotionPrice
        ? promotion.promotionPrice
        : product.promotion.promotionPrice;

      const updatedProduct = await product.save();

      return res.status(200).json(updatedProduct);
    } catch (err) {
      next(err);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    const { restaurantId, productId } = req.params as RequestParams;

    try {
      const product = await ProductModel.findById(productId);

      if (!product) {
        const err = {
          message: "Could not found the product with the passed id",
          status: 404,
        };
        return next(err);
      }

      if (product.restaurantId.toString() !== restaurantId) {
        const err = {
          message: "Could not found the product with the passed id",
          status: 404,
        };
        return next(err);
      }

      await ProductModel.findByIdAndDelete(productId);
      return res.status(200).json({ message: "Product was deleted!" });
    } catch (err) {
      next(err);
    }
  }
}

export default Product;
