import express from "express";
import restaurantRoutes from "./routes/restaurantRoutes";
const app = express();

app.use(express.json());
app.use(restaurantRoutes);

export default app;
