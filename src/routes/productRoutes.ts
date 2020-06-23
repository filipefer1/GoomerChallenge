import {Router} from "express";
import ProductController from "../controllers/ProductController";

const productController = new ProductController();
const router = Router();

router.post("/product/:restaurantId", productController.create);
router.get("/product/:restaurantId", productController.index);
router.delete("/product/:restaurantId/:productId", productController.destroy);
router.put("/product/:restaurantId/:productId", productController.update);

export default router;