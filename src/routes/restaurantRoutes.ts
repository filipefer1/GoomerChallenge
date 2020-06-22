import {Router} from "express";
import RestaurantController from "../controllers/RestaurantController";

const router = Router();
const restaurantController = new RestaurantController()

router.post("/restaurant", restaurantController.create);
router.get("/restaurant", restaurantController.index);
router.get("/restaurant/:restaurantId", restaurantController.show);
router.put("/restaurant/:restaurantId", restaurantController.update);
router.delete("/restaurant/:restaurantId", restaurantController.destroy);

export default router;