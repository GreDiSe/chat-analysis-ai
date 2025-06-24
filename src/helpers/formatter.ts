export const formatSpaces = ({
  curValue,
  isSpaces,
}: {
  curValue: string;
  isSpaces: boolean;
}): string => {
  let validText = curValue.trimStart();

  if (isSpaces) {
    validText = validText.replace(/\s\s+/g, ' ');
  } else {
    validText = validText.replace(/\s+/g, '');
  }
  return validText;
};
