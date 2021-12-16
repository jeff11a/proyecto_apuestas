//Validation
//Package to validate our information
const Joi = require("@hapi/joi");

//Register Validation
const registerValidation = (data) => {
  //This schema is made with @hapi/joi to validate the data
  //The email at the end makes sure this is also an email
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    userName: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    dateBirth: Joi.string().required(),
  });

  //LETS VALIDATE THE DATA BEFORE WE MAKE A USER with @hapi/joi
  //The first argument is the data, we are using our Joi schema to validate the data inside requests.body
  //this throw us back an object that we can save
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

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
