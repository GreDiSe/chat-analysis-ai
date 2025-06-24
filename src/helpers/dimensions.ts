import { Dimensions } from 'react-native';

export const { height: screenHeight, width: screenWidth } =
  Dimensions.get('screen');

// Figma design
const MODEL_HEIGHT = 812;
const MODEL_WIDTH = 375;

export const relativeHeight = (heightSize: number) =>
  screenHeight * (heightSize / MODEL_HEIGHT);

export const relativeWidth = (widthSize: number) =>
  screenWidth * (widthSize / MODEL_WIDTH);
