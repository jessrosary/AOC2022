import { readFileSync } from 'fs';

const inputData = readFileSync('./data/input06.txt', 'utf8');

const allUnique = (str) => {
  let chars = {};
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (chars[char]) {
      return false;
    }
    chars[char] = true;
  }
  return true;
};

const evalFour = (str) => {
  for (let i = 4; i < str.length; i++) {
    let chars = str.slice(i - 4, i);
    if (allUnique(chars)) {
      return i;
      break;
    }
  }
};

const evalFourteen = (str) => {
  for (let i = 14; i < str.length; i++) {
    let chars = str.slice(i - 14, i);
    if (allUnique(chars)) {
      return i;
      break;
    }
  }
};

console.log(evalFourteen(inputData));
