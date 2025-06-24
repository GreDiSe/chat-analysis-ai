// import { replace, StackScreens } from '@navigation';
// import { Text, View } from "react-native";
// import auth from '@react-native-firebase/auth';

// import {
//   HeaderLogoContainer,
//   SaveAreaAuthContainer,
//   SocialButtonsContainer,
// } from '../UI';
// import { styles } from './style';
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

// export const SignInScreen = () => {
//   const navToComingSoonScreen = () => {
//     replace(StackScreens.ComingSoon);
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

//       // google services are available
//       const hasPreviousSignIn = await GoogleSignin.hasPreviousSignIn();

//       if(hasPreviousSignIn) {
//         await GoogleSignin.revokeAccess();
//         await GoogleSignin.signOut();
//       }

//       const signInResult = await GoogleSignin.signIn();
//       const idToken = signInResult.data?.idToken;

//       if (!idToken) {
//         throw new Error('No ID token found');
//       }

//       // Create a Google credential with the token
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//       // Sign-in the user with the credential
//       await auth().signInWithCredential(googleCredential);
//       navToComingSoonScreen();
//     } catch (err) {
//       console.error('play services are not available:', err);
//     }
//   }

//   const handleTermsPress = () => {
//     replace(StackScreens.Terms);
//   };

//   const handlePrivacyPress = () => {
//     replace(StackScreens.Privacy);
//   };

//   return (
//     <SaveAreaAuthContainer style={styles.container}>
//       <HeaderLogoContainer />
//       <Text style={styles.title}>Let us help you</Text>
//       <Text style={styles.subtitle}>A breakup hurts, but healing starts here. We're with you through every emotional high and low.</Text>

//       <SocialButtonsContainer
//         handleGoogleSignIn={handleGoogleSignIn}
//       />
//       <View style={{ marginTop: 'auto', padding: 45, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
//         <Text style={styles.privacyText}>By tapping Continue, you agree to Breakup Glow's </Text>

//         <Text style={[styles.privacyText, styles.linkText]} onPress={handlePrivacyPress}>
//           Privacy Policy
//         </Text>

//         <Text style={styles.privacyText}> and </Text>

//         <Text style={[styles.privacyText, styles.linkText]} onPress={handleTermsPress}>
//           Terms and Conditions
//         </Text>

//         <Text style={styles.privacyText}>.</Text>
//       </View>
//     </SaveAreaAuthContainer>
//   );
// };
