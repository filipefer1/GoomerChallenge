import {celebrate, Joi} from "celebrate";

const stringValidator = Joi.string().required().trim();

export const create = celebrate({
  body: Joi.object().keys({
    name: stringValidator,
    picture: stringValidator,
    address: Joi.object().keys({
      street: stringValidator ,
      city: stringValidator,
      zipCode: stringValidator,
      state: stringValidator.length(2).uppercase()
    }) ,
    week: Joi.array().items({
      day: stringValidator,
      open: Joi.boolean().required(),
      openingTime: Joi.string().trim(),
      closingTime: Joi.string().trim()
    })
  })
});