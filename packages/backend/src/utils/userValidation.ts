import * as yup from 'yup';

export const createUserSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  role: yup.string().required(),
  password: yup.string().required(),
});

export const updateUserSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  role: yup.string().required(),
  password: yup.string().optional(),
});
