import express from "express";

import restaurantRoutes from "./routes/restaurantRoutes";
import productRoutes from "./routes/productRoutes";
import {
  celebrateErrorHandling,
  internalErrorHandler,
} from "./utils/errorHandler";

const app = express();

app.use(express.json());
app.use(restaurantRoutes);
app.use(productRoutes);

app.use(celebrateErrorHandling);
app.use(internalErrorHandler);

export default app;
