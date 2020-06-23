import { Router } from "express";
import ProductController from "../controllers/ProductController";
import {
  productParams,
  restaurantParams,
  productBody,
  productBodyUpdate,
} from "../utils/validators";

const productController = new ProductController();
const router = Router();

router.get("/product/:restaurantId", restaurantParams, productController.index);

router.put(
  "/product/:restaurantId/:productId",
  productBodyUpdate,
  productParams,
  productController.update
);

router.post(
  "/product/:restaurantId",
  productBody,
  restaurantParams,
  productController.create
);
router.delete(
  "/product/:restaurantId/:productId",
  productParams,
  productController.destroy
);


export default router;
