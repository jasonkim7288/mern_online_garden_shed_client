// generate random characters with num length
export const getRandomCharacter = (num) => {
  const possibleChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
  let retStr = '';
  for (let i = 0; i < num; i++) {
    retStr += possibleChar.charAt(Math.floor(Math.random() * possibleChar.length));
  }

  return retStr;
}