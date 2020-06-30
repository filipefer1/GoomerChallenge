import { Router } from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import RestaurantController from "../controllers/RestaurantController";
import {
  restaurantBody,
  restaurantParams,
  restaurantBodyUpdate,
} from "../utils/validators";

const router = Router();
const restaurantController = new RestaurantController();

const upload = multer(multerConfig);

router.get("/restaurant", restaurantController.index);
router.get(
  "/restaurant/:restaurantId",
  restaurantParams,
  restaurantController.show
);
router.post(
  "/restaurant",
  upload.single("image"),
  restaurantBody,
  restaurantController.create
);
router.put(
  "/restaurant/:restaurantId",
  restaurantBodyUpdate,
  restaurantParams,
  restaurantController.update
);
router.delete(
  "/restaurant/:restaurantId",
  restaurantParams,
  restaurantController.destroy
);

export default router;
