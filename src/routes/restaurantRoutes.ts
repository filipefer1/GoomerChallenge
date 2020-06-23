import {Router} from "express";
import RestaurantController from "../controllers/RestaurantController";
import {create} from "../utils/validators";

const router = Router();
const restaurantController = new RestaurantController()

router.get("/restaurant", restaurantController.index);
router.get("/restaurant/:restaurantId", restaurantController.show);
router.post("/restaurant", create, restaurantController.create);
router.put("/restaurant/:restaurantId", restaurantController.update);
router.delete("/restaurant/:restaurantId", restaurantController.destroy);

export default router;