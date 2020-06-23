import { Router } from "express";
import RestaurantController from "../controllers/RestaurantController";
import {
  restaurantBody,
  restaurantParams,
  restaurantBodyUpdate,
} from "../utils/validators";

const router = Router();
const restaurantController = new RestaurantController();

router.get("/restaurant", restaurantController.index);
router.get(
  "/restaurant/:restaurantId",
  restaurantParams,
  restaurantController.show
);
router.post("/restaurant", restaurantBody, restaurantController.create);
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
