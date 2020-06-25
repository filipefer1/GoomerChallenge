import { celebrate, Joi, Segments } from "celebrate";
import { Types } from "mongoose";

const stringValidator = Joi.string().required().trim();
const stringValidatorUpdate = Joi.string().trim();

export const validateObjectId = (value: string) => {
  const id = new Types.ObjectId(value);
  if (id instanceof Types.ObjectId) {
    return value;
  } else {
    throw new Error();
  }
};

export const validateTime = (value: string) => {
  const hourSplit = value.split(":");
  const minutes = hourSplit[1];
  const error = new Error("Hour format is invalid!");

  if (!hourSplit) {
    throw error;
  }

  if (
    minutes === "00" ||
    minutes === "15" ||
    minutes === "30" ||
    minutes === "45"
  ) {
    return value;
  } else {
    throw error;
  }
};

const timeValidator = Joi.string().trim().custom(validateTime);

export const restaurantBody = celebrate({
  body: Joi.object().keys({
    name: stringValidator,
    picture: stringValidator,
    address: Joi.object().keys({
      street: stringValidator,
      city: stringValidator,
      zipCode: stringValidator,
      state: stringValidator.length(2).uppercase(),
    }),
    week: Joi.array().items({
      day: stringValidator,
      open: Joi.boolean().required(),
      openingTime: timeValidator,
      closingTime: timeValidator,
    }),
  }),
});

export const restaurantBodyUpdate = celebrate({
  body: Joi.object().keys({
    name: stringValidatorUpdate,
    picture: stringValidatorUpdate,
    address: Joi.object().keys({
      street: stringValidatorUpdate,
      city: stringValidatorUpdate,
      zipCode: stringValidatorUpdate,
      state: stringValidatorUpdate.length(2).uppercase(),
    }),
    week: Joi.array().items({
      day: stringValidatorUpdate,
      open: Joi.boolean(),
      openingTime: timeValidator,
      closingTime: timeValidator,
    }),
  }),
});

export const productBodyUpdate = celebrate({
  body: Joi.object().keys({
    name: stringValidatorUpdate,
    picture: stringValidatorUpdate,
    price: Joi.number(),
    category: stringValidatorUpdate,
    promotion: Joi.object().keys({
      description: stringValidatorUpdate,
      promotionalPrice: Joi.number(),
      days: Joi.array().items({
        day: stringValidatorUpdate,
        isItInPromotion: Joi.boolean(),
        startPromotion: timeValidator,
        endPromotion: timeValidator,
      }),
    }),
  }),
});

export const productBody = celebrate({
  body: Joi.object().keys({
    name: stringValidator,
    picture: stringValidator,
    price: Joi.number().required(),
    category: stringValidator,
    promotion: Joi.object().keys({
      description: stringValidator,
      promotionalPrice: Joi.number().required(),
      days: Joi.array().items({
        day: stringValidator,
        isItInPromotion: Joi.boolean(),
        startPromotion: timeValidator,
        endPromotion: timeValidator,
      }),
    }),
  }),
});

export const productParams = celebrate({
  [Segments.PARAMS]: {
    restaurantId: stringValidator
      .custom(validateObjectId)
      .error(new Error("Restaurant Id invalid")),
    productId: stringValidator
      .custom(validateObjectId)
      .error(new Error("Product Id invalid")),
  },
});

export const restaurantParams = celebrate({
  [Segments.PARAMS]: {
    restaurantId: stringValidator
      .custom(validateObjectId)
      .error(new Error("Restaurant Id invalid")),
  },
});
