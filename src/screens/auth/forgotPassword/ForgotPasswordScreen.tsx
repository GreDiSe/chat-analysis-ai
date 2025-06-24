// import { ExtendedButton, Input } from '@components';
// import { forgotPasswordSchema } from '@helpers';
// import { goBack } from '@navigation';
// import { TranslationKeysType } from '@types';
// import { useFormik } from 'formik';
// import { useTranslation } from 'react-i18next';
// import { Text } from 'react-native';

// import { HeaderLogoContainer, SaveAreaAuthContainer } from '../UI';
// import { styles } from './style';

// interface IForgotPasswordValues {
//   email: string;
// }

// export const ForgotPasswordScreen = () => {
//   const { t } = useTranslation();

//   const {
//     values,
//     setFieldValue,
//     handleSubmit,
//     isValid,
//     touched,
//     setFieldTouched,
//     errors,
//   } = useFormik<IForgotPasswordValues>({
//     validationSchema: forgotPasswordSchema,
//     initialValues: {
//       email: '',
//     },
//     validateOnMount: true,
//     onSubmit: ({ email }) => {
//       console.log(email);
//     },
//   });

//   return (
//     <SaveAreaAuthContainer style={styles.container}>
//       <HeaderLogoContainer />
//       <Text style={styles.title}>{t('screens.forgotPassword.title')}</Text>
//       <Input
//         value={values.email}
//         onChangeText={text => setFieldValue('email', text)}
//         label={t('input.label.email')}
//         placeholder={t('input.placeholder.email')}
//         onBlur={() => setFieldTouched('email')}
//         errorMessage={touched.email && t(errors.email as TranslationKeysType)}
//         keyboardType="email-address"
//         textContentType="emailAddress"
//         returnKeyType="done"
//         isSpaces={false}
//       />
//       <ExtendedButton
//         title={t('buttons.sendACode')}
//         onPress={handleSubmit}
//         disabled={!isValid}
//       />
//       <ExtendedButton
//         title={t('buttons.backToSignIn')}
//         onPress={goBack}
//         type="border"
//         style={styles.buttonBottomContainer}
//       />
//     </SaveAreaAuthContainer>
//   );
// };
