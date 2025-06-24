export const isValidEmail = (email: string) => {
  const regExp =
    /^[a-zA-Z\d!#$%&'*+/=?^_`{|}~.-]+@[a-zA-Z\d-]+(\.[a-zA-Z]{2,})+$/;

  return regExp.test(email);
};

export const hasSpecialCharacter = (value: string) =>
  /[!@#$%^&*(),.?":{}|<>]/.test(value);

export const hasNumbers = (value: string) => /[0-9]/.test(value);

export const hasUpperCase = (password: string) => /[A-Z]/.test(password);

export const hasLowerCase = (password: string) => /[a-z]/.test(password);
