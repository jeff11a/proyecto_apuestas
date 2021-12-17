//Validation
//Package to validate our information
const Joi = require("@hapi/joi");

//Register Validation
const registerValidation = (data) => {
  //This schema is made with @hapi/joi to validate the data

  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    userName: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    dateBirth: Joi.string().required(),
    age: Joi.number().required(),
  });

  //LETS VALIDATE THE DATA BEFORE WE MAKE A USER with @hapi/joi

  return schema.validate(data);
};

//login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

//events validation

const eventsValidation = (data) => {
  const schema = Joi.object({
    evento: Joi.string().min(3).required(),
    participantes: Joi.array().items(Joi.string()),
  });
  return schema.validate(data);
};

const historyValidation = (data) => {
  const schema = Joi.object({
    idUser: Joi.string().required(),
    victoria: Joi.boolean().required(),
    apuesta: Joi.string().required(),
    ganador: Joi.string().required(),
    fecha: Joi.string(),
    ganancia: Joi.number().required(),
    perdida: Joi.number().required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.eventsValidation = eventsValidation;
module.exports.historyValidation = historyValidation;
