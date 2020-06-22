import mongoose from "mongoose";
import app from "./app";


mongoose.connect("mongodb://localhost/goomer", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.listen(3333, () => console.log("Listen on port 3333"));