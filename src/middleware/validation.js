const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
});

const storeSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
});

const carSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
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
