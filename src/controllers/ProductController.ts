import { Request, Response } from "express";

import ProductModel from "../models/product";
import { RequestParams } from "../interfaces/global";

interface RequestBody {
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
        isItInPromotion: boolean;
        startPromotion: string;
        endPromotion: string;
      },
      {
        day: string;
        isItInPromotion: boolean;
        startPromotion: string;
        endPromotion: string;
      },
      {
        day: string;
        isItInPromotion: boolean;
        startPromotion: string;
        endPromotion: string;
      },
      {
        day: string;
        isItInPromotion: boolean;
        startPromotion: string;
        endPromotion: string;
      },
      {
        day: string;
        isItInPromotion: boolean;
        startPromotion: string;
        endPromotion: string;
      },
      {
        day: string;
        isItInPromotion: boolean;
        startPromotion: string;
        endPromotion: string;
      },
      {
        day: string;
        isItInPromotion: boolean;
        startPromotion: string;
        endPromotion: string;
      }
    ];
  };
}

class Product {
  async create(req: Request, res: Response) {
    const {
      name,
      picture,
      price,
      category,
      promotion,
    } = req.body as RequestBody;
    const { restaurantId } = req.params as RequestParams;

    const product = new ProductModel({
      name,
      picture,
      price,
      category,
      promotion,
      restaurantId,
    });

    const newProduct = await product.save();
    return res.status(201).json(newProduct);
  }

  async index(req: Request, res: Response) {
    const { restaurantId } = req.params as RequestParams;
    const products = await ProductModel.find({
      restaurantId: restaurantId,
    }).populate("restaurantId", "name");

    return res.status(200).json(products);
  }

  async update(req: Request, res: Response) {
    const { restaurantId, productId } = req.params as RequestParams;
    const {
      name,
      picture,
      price,
      category,
      promotion,
    } = req.body as RequestBody;

    const product = await ProductModel.findById(productId);

    if (product?.restaurantId.toString() !== restaurantId) {
      return res.status(404).json({ message: "Bad request" });
    }

    promotion.days.forEach((updatedDay) => {
      product.promotion.days.forEach((day, index) => {
        if (updatedDay.day === day.day) {
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
  }

  async destroy(req: Request, res: Response) {
    const { restaurantId, productId } = req.params as RequestParams;

    const product = await ProductModel.findById(productId);

    if (product?.restaurantId.toString() !== restaurantId) {
      return res.status(404).json({ message: "Bad request" });
    }

    await ProductModel.findByIdAndDelete(productId);
    return res.status(200).json({ message: "Product was deleted!" });
  }
}

export default Product;
