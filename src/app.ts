import express from "express";

import restaurantRoutes from "./routes/restaurantRoutes";
import productRoutes from "./routes/productRoutes";
import {celebrateErrorHandling} from "./utils/errorHandler";

const app = express();

app.use(express.json());
app.use(restaurantRoutes);
app.use(productRoutes);

app.use(celebrateErrorHandling)

export default app;
