export const signUpFields = [
  {
    fieldName: 'email',
    label: 'input.label.email',
    placeholder: 'input.placeholder.email',
    keyboardType: 'email-address',
    textContentType: 'emailAddress',
    autoCapitalize: 'none',
    isSpaces: false,
    returnKeyType: 'next',
  },
  {
    fieldName: 'password',
    label: 'input.label.password',
    placeholder: 'input.placeholder.password',
    isSecureText: true,
    autoCapitalize: 'none',
    isSpaces: false,
    textContentType: 'newPassword',
    returnKeyType: 'next',
  },
  {
    fieldName: 'confirmPassword',
    label: 'input.label.passwordConfirm',
    placeholder: 'input.placeholder.passwordConfirm',
    isSecureText: true,
    textContentType: 'newPassword',
    autoCapitalize: 'none',
    isSpaces: false,
    returnKeyType: 'done',
  },
] as const;

export const signInFields = [
  {
    fieldName: 'email',
    label: 'input.label.email',
    placeholder: 'input.placeholder.email',
    keyboardType: 'email-address',
    textContentType: 'emailAddress',
    autoCapitalize: 'none',
    isSpaces: false,
    returnKeyType: 'next',
  },
  {
    fieldName: 'password',
    label: 'input.label.password',
    placeholder: 'input.placeholder.password',
    textContentType: 'password',
    isSecureText: true,
    autoCapitalize: 'none',
    isSpaces: false,
    returnKeyType: 'done',
  },
] as const;

export const changePasswordFields = [
  {
    fieldName: 'oldPassword',
    isSecureText: true,
    textContentType: 'password',
    label: 'inputs.oldPassword',
    isSpaces: false,
    autoCapitalize: 'none',
    returnKeyType: 'next',
  },
  {
    fieldName: 'newPassword',
    isSecureText: true,
    textContentType: 'password',
    label: 'inputs.newPassword',
    isSpaces: false,
    autoCapitalize: 'none',
    returnKeyType: 'next',
  },
  {
    fieldName: 'confirmPassword',
    isSecureText: true,
    textContentType: 'password',
    label: 'inputs.confirmNewPassword',
    isSpaces: false,
    autoCapitalize: 'none',
    returnKeyType: 'done',
  },
];
