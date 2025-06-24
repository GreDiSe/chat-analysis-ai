// import {
//   ChangeLanguageContainer,
//   ExtendedButton,
//   IInput,
//   Input,
//   ValidPasswordContainer,
// } from '@components';
// import { signUpFields, signUpSchema } from '@helpers';
// import { TranslationKeysType } from '@types';
// import { useFormik } from 'formik';
// import { useTranslation } from 'react-i18next';

// import {
//   SaveAreaAuthContainer,
//   StepProgressContainer,
// } from '../UI';
// import { styles } from './style.ts';

// interface ISignUpValues {
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// export const SignUpScreen = () => {
//   const { t } = useTranslation();

//   const {
//     values,
//     setFieldValue,
//     handleSubmit,
//     setFieldTouched,
//     isValid,
//     touched,
//     errors,
//   } = useFormik<ISignUpValues>({
//     validationSchema: signUpSchema,
//     initialValues: {
//       email: '',
//       password: '',
//       confirmPassword: '',
//     },
//     validateOnMount: true,
//     onSubmit: ({ email, password, confirmPassword }) => {
//       console.log(email, password, confirmPassword);
//     },
//   });

//   const renderInput = (
//     {
//       fieldName,
//       label,
//       placeholder,
//       ...props
//     }: {
//       fieldName: keyof ISignUpValues;
//       label: TranslationKeysType;
//       placeholder: TranslationKeysType;
//     } & IInput,
//     i: number,
//   ) => (
//     <Input
//       key={`${fieldName}_${i}`}
//       value={values[fieldName]}
//       onChangeText={text => setFieldValue(fieldName, text)}
//       label={t(label)}
//       placeholder={t(placeholder)}
//       onBlur={() => setFieldTouched(fieldName)}
//       errorMessage={
//         touched[fieldName] && t(errors[fieldName] as TranslationKeysType)
//       }
//       {...props}
//     />
//   );

//   return (
//     <SaveAreaAuthContainer style={styles.container}>
//       <StepProgressContainer
//         title={t('screens.signUp.registration')}
//         currentStep={1}
//       />
//       {signUpFields.map(renderInput)}
//       <ValidPasswordContainer password={values.password} />
//       <ExtendedButton
//         title={t('buttons.createAccount')}
//         onPress={handleSubmit}
//         disabled={!isValid}
//       />
//       <ChangeLanguageContainer style={styles.languageContainer} />
//     </SaveAreaAuthContainer>
//   );
// };
