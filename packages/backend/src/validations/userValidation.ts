import Joi from 'joi';

export const createUserSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.empty': 'שדה חובה',
  }),
  lastName: Joi.string().required().messages({
    'string.empty': 'שדה חובה',
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    'string.email': 'אימייל לא חוקי',
    'string.empty': 'שדה חובה',
  }),
  phone: Joi.string()
    .pattern(/^\d+$/)
    .required()
    .messages({
      'string.pattern.base': 'מספר טלפון חייב להכיל ספרות בלבד',
      'string.empty': 'שדה חובה',
    }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z\u0590-\u05FF])(?=.*\d)[A-Za-z\u0590-\u05FF\d]{6,}$/)
    .required()
    .messages({
      'string.pattern.base': 'הסיסמה חייבת לכלול אותיות (אנגלית או עברית) ומספרים, לפחות 6 תווים',
      'string.empty': 'שדה חובה',
    }),
  role: Joi.string()
    .valid('admin', 'manager', 'student')
    .required()
    .messages({
      'any.only': 'תפקיד לא חוקי',
      'string.empty': 'שדה חובה',
    }),
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().email({ tlds: false }).optional().messages({
    'string.email': 'אימייל לא חוקי',
  }),
  phone: Joi.string()
    .pattern(/^\d+$/)
    .optional()
    .messages({
      'string.pattern.base': 'מספר טלפון חייב להכיל ספרות בלבד',
    }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z\u0590-\u05FF])(?=.*\d)[A-Za-z\u0590-\u05FF\d]{6,}$/)
    .optional()
    .messages({
      'string.pattern.base': 'הסיסמה חייבת לכלול אותיות ומספרים',
    }),
  role: Joi.string()
    .valid('admin', 'manager', 'student')
    .optional()
    .messages({
      'any.only': 'תפקיד לא חוקי',
    }),
});
