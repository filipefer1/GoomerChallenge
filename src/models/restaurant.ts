import { Schema, model, Document } from "mongoose";

const Restaurant = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
      },
      state: {
        type: String,
        minLength: 2,
        maxLength: 2,
        required: true,
      },
    },
    week: [
      {
        day: { type: String, required: true, default: "monday" },
        open: { type: Boolean, required: true },
        openingTime: String,
        closingTime: String,
      },
      {
        day: { type: String, required: true, default: "tuesday" },
        open: { type: Boolean, required: true },
        openingTime: String,
        closingTime: String,
      },
      {
        day: { type: String, required: true, default: "wednesday" },
        open: { type: Boolean, required: true },
        openingTime: String,
        closingTime: String,
      },
      {
        day: { type: String, required: true, default: "thursday" },
        open: { type: Boolean, required: true },
        openingTime: String,
        closingTime: String,
      },
      {
        day: { type: String, required: true, default: "friday" },
        open: { type: Boolean, required: true },
        openingTime: String,
        closingTime: String,
      },
      {
        day: { type: String, required: true, default: "saturday" },
        open: { type: Boolean, required: true },
        openingTime: String,
        closingTime: String,
      },
      {
        day: { type: String, required: true, default: "sunday" },
        open: { type: Boolean, required: true },
        openingTime: String,
        closingTime: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

interface Restaurant extends Document {
  name: string;
  picture: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
    state: string;
  };
  week: [
    {
      day: string;
      open: boolean;
      openingTime?: string;
      closingTime?: string;
    },
    {
      day: string;
      open: boolean;
      openingTime?: string;
      closingTime?: string;
    },
    {
      day: string;
      open: boolean;
      openingTime?: string;
      closingTime?: string;
    },
    {
      day: string;
      open: boolean;
      openingTime?: string;
      closingTime?: string;
    },
    {
      day: string;
      open: boolean;
      openingTime?: string;
      closingTime?: string;
    },
    {
      day: string;
      open: boolean;
      openingTime?: string;
      closingTime?: string;
    },
    {
      day: string;
      open: boolean;
      openingTime?: string;
      closingTime?: string;
    }
  ];
}
export default model<Restaurant>("Restaurant", Restaurant);
