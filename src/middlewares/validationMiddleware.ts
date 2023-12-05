import { body } from 'express-validator';

export const validateUser = [
  body('name').isString().notEmpty(),
  body('username').isString().notEmpty(),
  body('email').isEmail().notEmpty(),
];
