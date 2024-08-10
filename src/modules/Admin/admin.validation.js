import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const signUp = {
  body: joi.object().required()
    .keys({
      name: generalFields.name,
      email: generalFields.email,
      phone: joi.string().trim().pattern(/^(010|012|011|015)\d{8}$/),
      password: generalFields.password,
    })
    .required(),
    query: joi.object().keys({
      
    }).required(),
    params:joi.object().keys({
      
    }).required()
};
export const signIn = {
  body: joi
    .object()
    .required()
    .keys({
      email: generalFields.email,
      password: joi.string().required(),
    })
    .required(),
    query: joi.object().keys({
      
    }).required(),
    params:joi.object().keys({
      
    }).required()
};
export const deleteUser = {
  body: joi
    .object()
    .required()
    .keys({
      
    })
    .required(),
    query: joi.object().keys({
      
    }).required(),
    params:joi.object().keys({
      
    }).required()
}