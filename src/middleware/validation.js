import joi from "joi";
import { Types } from "mongoose";
const dataMethods = ["body", "params", "query", "headers"];

const validateObjectId = (value, helper) => {
  return Types.ObjectId.isValid(value) ? true : helper.message("Invalid Id");
};

export const generalFields = {
  id: joi.string().custom(validateObjectId).required(),
  name: joi.string(),
  //!todo add address
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 4,
      tlds: { allow: ["com", "net", "org","outlook","gov","edu"] },
    }).message('Please enter a valid email address.'),
  password: joi
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{:;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/)
    .required(),
  cPassword: joi.string(),
  phone: joi
    .string()
    .trim()
    .pattern(/^(010|012|011|015)\d{8}$/).message('Phone number must start with 010, 012, 011, or 015 followed by 8 digits.')

   . required(),
   code:joi
   .string()
   .trim()
   .regex(/^\d{4}$/)
};

export const validation = (joiSchema) => {
  return (req, res, next) => {
    const validationErr = [];
    dataMethods.forEach((method) => {
      if (joiSchema[method]) {
        const validationResult = joiSchema[method].validate(req[method], {
          abortEarly: false,
        });
        if (validationResult.error) {
          validationErr.push(validationResult.error.details[0].message);
        }
      }
    });
    if (validationErr.length) {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: validationErr });
    }
    return next();
  };
};

