const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  isAdmin: Joi.boolean().required(),
});

const storeSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
});

const carSchema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().required(),
  price: Joi.number().required(),
});

const idSchema = Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required();

const validateBody = (body, schema) => {
  const { error, value } = schema.validate(body);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }
  return value;
};

const validateId = (id) => {
  return validateBody(id, idSchema);
};

module.exports = {
  validateBody,
  validateId,
  userSchema,
  storeSchema,
  carSchema, 
};
