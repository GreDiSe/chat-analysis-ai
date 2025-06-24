import * as yup from 'yup';

import {
  hasLowerCase,
  hasNumbers,
  hasSpecialCharacter,
  hasUpperCase,
  isValidEmail,
} from './validation';

const email = yup
  .string()
  .required('validation.email.required')
  .max(255, 'validation.email.max')
  .test('isValidEmail', 'validation.email.valid', (value: string) =>
    isValidEmail(value),
  );

const passwordRequired = yup.string().required('validation.password.required');

const password = passwordRequired
  .min(8, '')
  .max(16, '')
  .test('hasSpecialCharacter', '', (value: string) =>
    hasSpecialCharacter(value),
  )
  .test('hasNumbers', '', (value: string) => hasNumbers(value))
  .test('hasLowerCase', '', (value: string) => hasLowerCase(value))
  .test('hasUpperCase', '', (value: string) => hasUpperCase(value));

export const signUpSchema = yup.object().shape({
  email,
  password: password.oneOf([yup.ref('confirmPassword')], ''),
  confirmPassword: passwordRequired.oneOf(
    [yup.ref('password')],
    'validation.password.notMatching',
  ),
});

export const signInSchema = yup.object().shape({
  email,
  password: passwordRequired,
});

export const forgotPasswordSchema = yup.object().shape({
  email,
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: passwordRequired,
  newPassword: password.oneOf([yup.ref('confirmPassword')], ''),
  confirmPassword: passwordRequired.oneOf(
    [yup.ref('newPassword')],
    'validation.password.notMatching',
  ),
});
