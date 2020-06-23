import { model, Schema, Document } from "mongoose";

const Product = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    picture: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    category: {
      required: true,
      type: String,
    },
    promotion: {
      description: {
        type: String,
        required: true,
      },
      promotionalPrice: {
        type: Number,
        required: true,
      },
      days: [
        {
          day: { type: String, default: "monday", required: true },
          isItInPromotion: { type: Boolean, required: true },
          startPromotion: String,
          endPromotion: String,
        },
        {
          day: { type: String, default: "tuesday", required: true },
          isItInPromotion: { type: Boolean, required: true },
          startPromotion: String,
          endPromotion: String,
        },
        {
          day: { type: String, default: "wednesday", required: true },
          isItInPromotion: { type: Boolean, required: true },
          startPromotion: String,
          endPromotion: String,
        },
        {
          day: { type: String, default: "thursday", required: true },
          isItInPromotion: { type: Boolean, required: true },
          startPromotion: String,
          endPromotion: String,
        },
        {
          day: { type: String, default: "friday", required: true },
          isItInPromotion: { type: Boolean, required: true },
          startPromotion: String,
          endPromotion: String,
        },
        {
          day: { type: String, default: "saturday", required: true },
          isItInPromotion: { type: Boolean, required: true },
          startPromotion: String,
          endPromotion: String,
        },
        {
          day: { type: String, default: "sunday", required: true },
          isItInPromotion: { type: Boolean, required: true },
          startPromotion: String,
          endPromotion: String,
        },
      ],
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
  },
  {
    timestamps: true,
  }
);

interface Product extends Document {
  name: string;
  picture: string;
  price: number;
  category: string;
  promotion: {
    description: string;
    promotionPrice: number;
    days: [
      {
        day: string;
        isItInPromotion: boolean;
        startPromotion: string;
        endPromotion: string;
      },
      {
        day: string;
        isItInPromotion: boolean;
        startPromotion: string;
        endPromotion: string;
      },
      {
        day: string;
        isItInPromotion: boolean;
        startPromotion: string;
        endPromotion: string;
      },
      {
        day: string;
        isItInPromotion: boolean;
        startPromotion: string;
        endPromotion: string;
      },
      {
        day: string;
        isItInPromotion: boolean;
        startPromotion: string;
        endPromotion: string;
      },
      {
        day: string;
        isItInPromotion: boolean;
        startPromotion: string;
        endPromotion: string;
      },
      {
        day: string;
        isItInPromotion: boolean;
        startPromotion: string;
        endPromotion: string;
      }
    ];
  };
  restaurantId: string
}

export default model<Product>("Product", Product)