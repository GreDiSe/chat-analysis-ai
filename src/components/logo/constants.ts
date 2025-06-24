import { SizeType } from './types.ts';

export const SIZE_MAP: Record<SizeType, { width: number; height: number }> = {
  signUpStep: { width: 150, height: 150 },
  signInStep: { width: 270, height: 270 },
  splash: { width: 200, height: 200 },
  resetPasswordSuccess: { width: 199, height: 22 },
};
